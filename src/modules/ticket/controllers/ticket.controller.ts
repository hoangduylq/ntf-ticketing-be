import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('ticket')
@ApiTags('ticket')
export class TicketController {}
