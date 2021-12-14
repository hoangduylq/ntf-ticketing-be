import { UserService } from './../../user/services/user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface IJwtPayload {
  id: string;
  username: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('accessTokenSecret'),
    });
  }

  async validate(payload: IJwtPayload) {
    try {
      const user = await this.userService.getUserById(payload.id);
      if (!user) {
        return false;
      }
      return user;
    } catch (error) {
      throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
    }
  }
}
