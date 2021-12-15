import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/modules/auth/decorator/role.decorator';
import { UserCredentialsDto } from '../dto/user-credential.dto';
import { UserService } from '../services/user.service';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { UserUpdateDto } from '../dto/user-update.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async getProfile(@Param('id') id: string) {
    const res = await this.userService.getUserById(id);
    return res;
  }

  @Post('signup')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signup(@Request() req, @Body() model: UserCredentialsDto) {
    return this.userService.signup(req.body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() userUpdateDto: UserUpdateDto) {
    return this.userService.update(id, userUpdateDto);
  }

  @Get('')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async getAllProfile() {
    return await this.userService.getAllUser();
  }
}
