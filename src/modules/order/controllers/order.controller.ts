import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderDto } from '../dto/order.dto';
import { OrderService } from '../services/order.service';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async create(@Body() orderDto: OrderDto) {
    return this.orderService.create(orderDto);
  }
}
