import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {}
