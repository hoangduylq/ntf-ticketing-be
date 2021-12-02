import { UserService } from 'src/modules/user/service/user.service';
import { Body, Controller, Post, Request } from '@nestjs/common';
import { UserCredentialsDto } from 'src/modules/auth/dto/user-credential.dto';
import { ApiTags } from '@nestjs/swagger';

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
