import { RoleService } from '../../role-permission/services/role.service';
import { UsersRepository } from '../infrastructure/user.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserCredentialsDto } from '../dto/user-credential.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRespository: UsersRepository,
    private roleService: RoleService,
  ) {}

  async findUserByEmail(email: string): Promise<any> {
    const user = this.usersRespository.findOne({ email });
    return user;
  }

  async findOrCreate(profile): Promise<any> {
    const user = await this.usersRespository.findOne({ email: profile.email });
    if (user) {
      return user;
    }

    const role = await this.roleService.findRole('User');

    const newUser = this.usersRespository.create({
      email: profile.email,
      username: profile.id,
      name: profile.name,
      role: role,
      isSocial: true,
    });
    const result = await this.usersRespository.save(newUser);
    const dto: UserDto = {
      email: result.email,
      name: result.name,
      role: result.role,
      isSocial: result.isSocial,
    };
    return dto;
  }

  async signup(userCredential: UserCredentialsDto): Promise<any> {
    const { email, name, gender, password } = userCredential;
    const isInvalidUser = await this.findUserByEmail(email);
    if (isInvalidUser) {
      throw new ConflictException('Email already exists');
    }
    const role = await this.roleService.findRole('User');

    const newUser = this.usersRespository.create({
      email: email,
      username: email,
      name: name,
      isSocial: false,
      role: role,
      gender: gender,
    });

    newUser.password = bcrypt.hashSync(password, 10);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await this.usersRespository.save(newUser);
    const dto: UserDto = {
      email: result.email,
      name: result.name,
      role: result.role,
      isSocial: result.isSocial,
    };
    return dto;
  }

  async getUserById(id: string | number) {
    return this.usersRespository.findOne(id);
  }
}
