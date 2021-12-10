import { TicketModule } from './../ticket/ticket.module';
import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './infrastructure/order.repository';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    TicketModule,
    EventModule,
  ],
  exports: [PaymentService],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
