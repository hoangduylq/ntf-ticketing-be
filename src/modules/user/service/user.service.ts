import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../dto/user.dto';
import { UsersRepository } from '../infrastructure/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRespository: UsersRepository,
  ) {}

  async findOrCreate(profile): Promise<any> {
    const user = await this.usersRespository.findOne({ email: profile.email });
    if (user) {
      return user;
    }

    const newUser = this.usersRespository.create({
      email: profile.email,
      username: profile.id,
      name: profile.name,
      isSocial: true,
      avatar: profile.photos[0].value,
    });
    const result = await this.usersRespository.save(newUser);
    const dto: UserDto = {
      email: result.email,
      name: result.name,
      role: result.role,
    };
    return dto;
  }

  async getUserById(id: string | number) {
    return this.usersRespository.findOne(id);
  }
}
