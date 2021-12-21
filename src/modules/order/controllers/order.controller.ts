import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderEntity } from '../domain/entities/order.entity';
import { OrderDto } from '../dto/order.dto';
import { PagingOptionDto } from '../dto/paging-option.dto';
import { OrderService } from '../services/order.service';

@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async create(@Body() orderDto: OrderDto) {
    return this.orderService.create(orderDto);
  }

  @Get('/paging')
  async getAllEvent(
    @Query() pagingOption: PagingOptionDto,
  ): Promise<OrderEntity[]> {
    return await this.orderService.getPaging(pagingOption);
  }
}
