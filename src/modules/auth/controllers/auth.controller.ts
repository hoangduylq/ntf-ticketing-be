import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  HttpException,
  HttpStatus,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from 'src/modules/user/dto/user-login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('facebook')
  async getTokenAfterFacebookSignIn(@Query() query) {
    return this.authService.loginWithFacebook(query.access_token);
  }

  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() req, @Body() model: UserLoginDto) {
    return this.authService.login(req.body);
  }

  @Get('login-jwt')
  @UseGuards(JwtAuthGuard)
  async loginWithJwt() {
    try {
      return this.authService.loginWithJwt();
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
