import { IPaginateOptions } from '../domain/interfaces/paginate_options.interface';
import { EventService } from '../../event/services/event.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from '../dto/order.dto';
import { OrderRepository } from '../infrastructure/order.repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    @InjectQueue('order-queue') private orderQueue: Queue,
    private eventService: EventService,
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

  async findAll() {
    try {
      const entities = await this.orderRepository.find();

      return entities;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneById(id: string) {
    const entity = await this.orderRepository.findOne({ id });
    return entity;
  }

  async paging(options: IPaginateOptions) {
    try {
      const { orderId, page = 1, limit = 5 } = options;

      const entities = await this.orderRepository.find({
        where: {
          id: orderId,
        },
        take: limit,
        skip: (page - 1) * limit,
        order: {
          createdAt: 'ASC',
        },
      });
      return entities;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
