import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { IUserInfo } from '../interface/IUser.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_CONSTANT_SECRET_KEY,
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
