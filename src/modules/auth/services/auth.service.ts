import { UserEntity } from './../../user/domain/entities/user.entity';
import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './../../user/dto/user-login.dto';
import { FacebookAuthService } from 'facebook-auth-nestjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly facebookService: FacebookAuthService,
  ) {}

  async login(userLogin: UserLoginDto): Promise<{ accessToken: string }> {
    const { email, password } = userLogin;
    const user = await this.usersService.findUserByEmail(email);
    if (user && !user.isSocial) {
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = await this.generateToken(user);
        return { accessToken };
      } else {
        throw new UnauthorizedException('Please check your email or password');
      }
    } else {
      throw new BadRequestException('Login Fail');
    }
  }

  async loginWithFacebook(accessToken: string) {
    try {
      const user = await this.facebookService.getUser(
        accessToken,
        'id',
        'name',
        'email',
      );

      if (user) {
        const internalUser = await this.usersService.signup(user);
        const accessToken = await this.generateToken(internalUser);
        return { accessToken };
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async generateToken(user: UserEntity): Promise<string> {
    const payload = {
      username: user.username,
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.name,
    };
    const accessToken: string = await this.jwtService.sign(payload);
    return accessToken;
  }
}
