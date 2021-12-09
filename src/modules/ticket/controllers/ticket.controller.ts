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
import { TicketDto } from '../dto/ticket.dto';
import { TicketService } from '../services/ticket.service';

@Controller('ticket')
@ApiTags('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('create')
  async create(@Body() ticketDto: TicketDto) {
    return this.ticketService.create(ticketDto);
  }

  @Get('getAll')
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() ticketDto: TicketDto) {
    return this.ticketService.update(id, ticketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }

  @Get('test-queue')
  testQueue(@Query('id') id: string) {
    this.ticketService.generateTokenNft(id);

    return id;
  }
}
