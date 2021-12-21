import { EventService } from '../../event/services/event.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from '../dto/order.dto';
import { OrderRepository } from '../infrastructure/order.repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { OrderEntity } from '../domain/entities/order.entity';
import { PagingOptionDto } from './../dto/paging-option.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EventDto, OrderPayloadDto } from '../dto/order-payload.dto';
import { EventEntity } from 'src/modules/event/domain/entities/event.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    @InjectQueue('order-queue') private orderQueue: Queue,
    private eventService: EventService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(orderDto: OrderDto): Promise<boolean> {
    try {
      const { eventId, amount } = orderDto;
      const event = await this.eventService.getEventById(eventId);
      if (amount <= event.availableTickets && event.status === 'Ready') {
        const newOrder = await this.orderRepository.create(orderDto);
        const { id } = await this.orderRepository.save(newOrder);

        for (let count = 1; count <= amount; count++) {
          await this.orderQueue.add('order-job', {
            id: id,
            amount,
            eventId,
          });
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async getAll(): Promise<OrderEntity[]> {
    try {
      const entities = await this.orderRepository.find();

      return entities;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOneById(id: string): Promise<OrderEntity> {
    const entity = await this.orderRepository.findOne({ id });
    return entity;
  }

  async getPaging(options: PagingOptionDto): Promise<any> {
    try {
      const { userId, page = 1, limit = 5 } = options;

      const entities = await this.orderRepository.find({
        where: {
          userId,
        },
        relations: ['event'],
        take: limit,
        skip: (page - 1) * limit,
        order: {
          createdAt: 'ASC',
        },
      });
      this.mapper.createMap(OrderEntity, OrderPayloadDto);
      this.mapper.createMap(EventEntity, EventDto);
      const orders = entities.map((entity) => {
        return this.mapper.map(entity, OrderPayloadDto, OrderEntity);
      });

      return orders;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
