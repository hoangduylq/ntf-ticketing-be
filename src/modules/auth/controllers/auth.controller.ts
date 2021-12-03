import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('facebook')
  async getTokenAfterFacebookSignIn(@Query() query) {
    return this.authService.loginWithFacebook(query.access_token);
  }
}
