<<<<<<< HEAD
import { RoleService } from './service/role.service';
import { RoleEntity } from './domain/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  exports: [RoleService],
  providers: [RoleService],
})
export class RolePermissionModule {}
=======
import { RoleService } from './service/role.service';
import { RoleEntity } from './domain/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  exports: [RoleService],
  providers: [RoleService],
})
export class RolePermissionModule {}
>>>>>>> feature/register-system
