import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from '../ticket/ticket.module';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { EventModule } from '../event/event.module';
import { OrderRepository } from './infrastructure/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    TicketModule,
    EventModule,
  ],
  exports: [OrderService],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
