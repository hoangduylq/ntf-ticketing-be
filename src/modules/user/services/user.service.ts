import { UserRepository } from './../infrastructure/user.repository';
import { RoleService } from '../../role-permission/services/role.service';
import {
  ConflictException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserCredentialsDto } from '../dto/user-credential.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRespository: UserRepository,
    private roleService: RoleService,
  ) {}

  async findUserByEmail(email: string): Promise<any> {
    // try {
    //   const user = await this.userRespository.findOneOrFail({ email });
    //   return user;
    // } catch (error) {
    //   throw new HttpException('Login Fail', HttpStatus.NOT_FOUND);
    // }
    const user = await this.userRespository.findOne({ email });
    return user;
  }

  async signup(userCredential: UserCredentialsDto): Promise<any> {
    const { id: uidFacebook, email, name, gender, password } = userCredential;
    const isInvalidUser = await this.findUserByEmail(email);
    if (isInvalidUser && isInvalidUser.isSocial) return isInvalidUser;

    if (isInvalidUser && !isInvalidUser.isSocial)
      throw new ConflictException('Email already exists');

    const role = await this.roleService.findRole('user');

    const newUser = this.userRespository.create({
      email: email,
      username: password ? email : uidFacebook,
      name: name,
      isSocial: password ? false : true,
      roleId: role.id,
      gender: gender,
    });

    if (password) {
      newUser.password = bcrypt.hashSync(password, 10);
    } else {
      newUser.password = null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await this.userRespository.save(newUser);
    const dto: UserDto = {
      email: result.email,
      name: result.name,
      role: role.name,
      isSocial: result.isSocial,
    };
    return dto;
  }

  async getUserById(id: string | number) {
    try {
      const user = await this.userRespository.findOne(id);

      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
      }

      return user;
    } catch (err) {
      throw new HttpException(err?.mesage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllUser() {
    return this.userRespository.findOne();
  }
}
