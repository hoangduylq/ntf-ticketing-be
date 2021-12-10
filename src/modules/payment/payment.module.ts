import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from './../ticket/ticket.module';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { EventModule } from '../event/event.module';
import { OrderRepository } from './infrastructure/order.repository';

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
