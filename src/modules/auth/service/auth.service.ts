import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FacebookAuthService } from 'facebook-auth-nestjs';
import { UserService } from './../../user/service/user.service';

export interface IToken {
  sub: string;
  email: string;
  name: string;
}
export interface ITokenResponse {
  access_token: string;
}
export interface ISocialUser {
  id?: number | string;
  name?: string;
  email?: string;
}

export type GetUserFacBook = () => Promise<ISocialUser>;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private readonly service: FacebookAuthService,
  ) {}

  async login(user: any): Promise<ITokenResponse> {
    const payload: IToken = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginWithFacebook(accessToken: string) {
    try {
      const user = await this.service.getUser(
        accessToken,
        'id',
        'name',
        'email',
      );
      console.log(user);

      // const internalUser = await this.userService.getUserById(id);

      // if (internalUser) {
      //   return this.login(internalUser);
      // }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new UnauthorizedException('Invalid access token');
    }
  }
}
