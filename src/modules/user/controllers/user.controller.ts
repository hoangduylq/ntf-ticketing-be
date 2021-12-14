import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/modules/auth/decorator/role.decorator';
import { UserCredentialsDto } from '../dto/user-credential.dto';
import { UserService } from '../services/user.service';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  getProfile(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post('signup')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signup(@Request() req, @Body() model: UserCredentialsDto) {
    try {
      return this.userService.signup(req.body);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async getAllProfile() {
    try {
      return await this.userService.getAllUser();
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
