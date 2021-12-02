import { UserService } from 'src/modules/user/service/user.service';
import { RolePermissionModule } from './../role-permission/role-permission.module';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from './../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    UserModule,
    RolePermissionModule,
    JwtModule.register({
      secret: process.env.JWT_CONSTANT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
