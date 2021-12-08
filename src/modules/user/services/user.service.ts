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
    const user = this.userRespository.findOne({ email });
    return user;
  }

  // async findOrCreate(profile): Promise<any> {
  //   const user = await this.userRespository.findOne({ email: profile.email });
  //   if (user && user.isSocial) return user;

  //   if (user) throw new ConflictException('Email already exists');

  //   const role = await this.roleService.findRole('user');

  //   const newUser = this.userRespository.create({
  //     email: profile.email,
  //     username: profile.id,
  //     name: profile.name,
  //     roleId: role.id,
  //     isSocial: true,
  //   });
  //   const result = await this.userRespository.save(newUser);
  //   const dto: UserDto = {
  //     email: result.email,
  //     name: result.name,
  //     role: role.name,
  //     isSocial: result.isSocial,
  //   };
  //   return dto;
  // }

  async signup(userCredential: UserCredentialsDto): Promise<any> {
    const { email, name, gender, password } = userCredential;
    const isInvalidUser = await this.findUserByEmail(email);
    if (isInvalidUser) {
      throw new ConflictException('Email already exists');
    }
    const role = await this.roleService.findRole('user');

    const newUser = this.userRespository.create({
      email: email,
      username: email,
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
