import { UserRepository } from './infrastructure/user.repository';
import { RolePermissionModule } from './../role-permission/role-permission.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BankRepository } from '../payment/infrastructure/bank.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, BankRepository]),
    RolePermissionModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
