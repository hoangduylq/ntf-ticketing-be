import { UserService } from 'src/modules/user/services/user.service';
import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserCredentialsDto } from '../dto/user-credential.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signup(@Request() req, @Body() model: UserCredentialsDto) {
    return this.userService.signup(req.body);
  }
}
