import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderDto } from '../dto/order.dto';
import { PaymentService } from '../services/payment.service';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async create(@Body() orderDto: OrderDto) {
    return this.paymentService.create(orderDto);
  }
}
