import { getDataError } from 'src/shared/json-format';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from 'src/modules/user/dto/user-login.dto';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('facebook')
  async getTokenAfterFacebookSignIn(@Query() query) {
    try {
      return this.authService.loginWithFacebook(query.access_token);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() req, @Body() model: UserLoginDto) {
    try {
      return this.authService.login(req.body);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
