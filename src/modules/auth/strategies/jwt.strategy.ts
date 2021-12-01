import { Injectable } from '@nestjs/common';
import { IUserInfo } from './../services/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'gq46xr787i',
    });
  }

  async validate(payload: IUserInfo) {
    return {
      id: payload.id,
      username: payload.username,
      name: payload.name,
      email: payload.email,
    };
  }
}
