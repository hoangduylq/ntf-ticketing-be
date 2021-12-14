import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IPaginateOptions } from '../domain/interfaces/paginate_options.interface';
import { TicketUpdateDto } from '../dto/ticket-update.dto';
import { TicketDto } from '../dto/ticket.dto';
import { TicketService } from '../services/ticket.service';

@Controller('tickets')
@ApiTags('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('')
  async create(@Body() ticketDto: TicketDto) {
    return this.ticketService.create(ticketDto);
  }

  @Get('paging')
  pagination(@Query() options: IPaginateOptions) {
    return this.ticketService.paginate(options);
  }

  @Get('')
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() ticketUpdateDto: TicketUpdateDto) {
    return this.ticketService.update(id, ticketUpdateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}
