import {
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

  //generate token
  async login(userLogin: UserLoginDto): Promise<{ accessToken: string }> {
    const { email, password } = userLogin;
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        username: user.username,
        id: user.id,
        email: user.email,
        name: user.name,
      };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your email or password');
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
      console.log(user);

      if (user) {
        return this.usersService.findOrCreate(user);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new UnauthorizedException('Invalid access token');
    }
  }
}
