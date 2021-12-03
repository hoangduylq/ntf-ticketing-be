import { FacebookAuthModule } from 'facebook-auth-nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../user/infrastructure/user.repository';
import { UserService } from '../user/service/user.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './service/auth.service';
import { RolePermissionModule } from './../role-permission/role-permission.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('accessTokenSecret'),
        signOptions: { expiresIn: configService.get('accessTokenExpiration') },
      }),
    }),
    FacebookAuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        clientId: +configService.get('authFacebook.app_id'),
        clientSecret: configService.get('authFacebook.app_secret'),
      }),
    }),
    TypeOrmModule.forFeature([UsersRepository]),
    ConfigModule,
    UserModule,
    PassportModule,
    RolePermissionModule,
  ],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
