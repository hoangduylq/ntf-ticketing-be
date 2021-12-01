import { UserEntity } from './../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRespository: Repository<UserEntity>,
  ) {}

  async findUser(email: string): Promise<any> {
    const user = await this.usersRespository.findOne({ email });
    return user;
  }
}
