import { RoleDto } from './../dto/role.dto';
import { RoleEntity } from '../domain/entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
  ) {}

  async getAllRole(): Promise<RoleDto[]> {
    return await this.rolesRepository.find();
  }

  async findRole(name: string): Promise<RoleEntity> {
    const role = await this.rolesRepository.findOne({ name });
    return role;
  }
}
