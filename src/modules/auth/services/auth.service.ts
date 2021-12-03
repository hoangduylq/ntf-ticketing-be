import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from 'src/modules/user/dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
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
}
