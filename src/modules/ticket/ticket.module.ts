import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './controllers/ticket.controller';
import { TicketRepository } from './infrastructure/ticket.repository';
import { TicketService } from './services/ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([TicketRepository])],
  exports: [TicketService],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
