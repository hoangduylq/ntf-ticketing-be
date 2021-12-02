import { UserLoginDto } from './../dto/user-login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/service/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  //generate token
  async login(userLogin: UserLoginDto): Promise<{ accessToken: string }> {
    const { email, password } = userLogin;
    const user = await this.usersService.findUser(email);
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
}
