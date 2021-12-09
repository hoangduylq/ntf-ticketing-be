import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './controllers/ticket.controller';
import { TicketRepository } from './infrastructure/ticket.repository';
import { TicketService } from './services/ticket.service';
import { BullModule } from '@nestjs/bull';
import { GenerateConsumer } from './infrastructure/generate.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketRepository]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5003,
      },
    }),
    BullModule.registerQueue({
      name: 'generate-token-nft-queue',
    }),
  ],
  exports: [TicketService],
  controllers: [TicketController],
  providers: [TicketService, GenerateConsumer],
})
export class TicketModule {}
