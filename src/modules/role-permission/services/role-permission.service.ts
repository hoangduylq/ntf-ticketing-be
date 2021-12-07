import { RolePermissionEntity } from './../domain/entities/rolePermission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermissionEntity)
    private rolePermissionsRepository: Repository<RolePermissionEntity>,
  ) {}
}
