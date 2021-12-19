import { Role } from 'src/modules/auth/decorator/role.decorator';
import { UserEntity } from './../domain/entities/user.entity';
import { UserRepository } from './../infrastructure/user.repository';
import { RoleService } from '../../role-permission/services/role.service';
import {
  ConflictException,
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserCredentialsDto } from '../dto/user-credential.dto';
import { UserDto } from '../dto/user.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { REQUEST } from '@nestjs/core';
import { IJwtPayload } from 'src/modules/auth/strategies/jwt.strategy';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private roleService: RoleService,
    @Inject(REQUEST) private readonly req: any,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async signup(userCredential: UserCredentialsDto): Promise<any> {
    const { id: uidFacebook, email, name, gender, password } = userCredential;
    const isInvalidUser = await this.findUserByEmail(email);
    if (isInvalidUser && isInvalidUser.isSocial) return isInvalidUser;

    if (isInvalidUser && !isInvalidUser.isSocial)
      throw new ConflictException('Email already exists');

    const role = await this.roleService.findRole('user');

    const newUser = this.userRepository.create({
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
    const result = await this.userRepository.save(newUser);
    const dto: UserDto = {
      email: result.email,
      name: result.name,
      role: role.name,
      isSocial: result.isSocial,
    };
    return dto;
  }

  async getUserById(id: string): Promise<UserEntity> {
    const userReq: IJwtPayload = this.req.user;
    if (userReq) {
      if (
        userReq.role === Role.Admin ||
        (userReq.role === Role.User && userReq.id === id)
      ) {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new NotFoundException('Not found');
        return user;
      }
    }

    throw new UnauthorizedException('Permission denied');
  }

  async getAllUser(): Promise<UserEntity[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async update(id: string, userUpdateDto: UserUpdateDto): Promise<boolean> {
    const userReq = this.req.user;
    if (userReq && userReq.id === id) {
      const user = await this.userRepository.findOne(id);
      if (user) {
        const userUpdated = await this.userRepository.update(
          {
            id: id,
          },
          {
            ...userUpdateDto,
          },
        );
        return !!userUpdated.affected;
      } else {
        return false;
      }
    }
  }
}
