import { UserLoginDto } from './../dto/user-login.dto';

import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: UserLoginDto })
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() req, @Body() model: UserLoginDto) {
    return this.authService.login(req.body);
  }
}
