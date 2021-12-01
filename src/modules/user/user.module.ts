import { UserController } from './controllers/user.controller';
import { UserService } from './service/user.service';
import { UserEntity } from './domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService, TypeOrmModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
