import { RolePermissionModule } from './../role-permission/role-permission.module';
import { UsersRepository } from './infrastructure/user.repository';
import { UserController } from './controllers/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), RolePermissionModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
