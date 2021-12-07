import { UserService } from './../../user/services/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from '../decorator/role.decorator';

interface IJwtPayload {
  id: string | number;
  username: string;
  name: string;
  email: string;
  role: Role;
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
    const user = this.userService.getUserById(payload.id);

    if (!user) {
      return false;
    }

    return user;
  }
}
