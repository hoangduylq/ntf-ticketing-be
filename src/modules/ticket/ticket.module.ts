import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './controllers/ticket.controller';
import { TicketRepository } from './infrastructure/ticket.repository';
import { TicketService } from './services/ticket.service';
import { BullModule } from '@nestjs/bull';
import { GenerateConsumer } from './infrastructure/generate.consumer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketRepository]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: +configService.get('redis.port'),
        },
        limiter: {
          max: 5,
          duration: 1000,
          bounceBack: false,
        },
      }),
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
