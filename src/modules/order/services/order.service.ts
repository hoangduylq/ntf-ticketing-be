import { IPaginateOptions } from '../domain/interfaces/paginate_options.interface';
import { EventService } from '../../event/services/event.service';
import { TicketService } from '../../ticket/services/ticket.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from '../dto/order.dto';
import { OrderRepository } from '../infrastructure/order.repository';
import { StatusEnum } from '../../ticket/domain/enums/status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
    private ticketService: TicketService,
    private eventService: EventService,
  ) {}

  async create(orderDto: OrderDto): Promise<any> {
    try {
      const { eventId, userId, bankId, amount } = orderDto;
      const event = await this.eventService.getEventById(eventId);
      if (amount <= event.availableTickets && event.status === 'Ready') {
        await this.eventService.updateAvaiableTickets(eventId, amount);
        const tickets = [];
        for (let i = 1; i <= amount; i++) {
          const entity = await this.ticketService.getTicketReady(eventId);
          const [ticket] = entity;
          if (ticket) {
            tickets.push(ticket.nftToken);
            await this.ticketService.update(ticket.id, {
              status: StatusEnum.Sold,
            });
          } else {
            //
          }
        }
        const newOrder = {
          eventId,
          userId,
          bankId,
          amount,
          tickets,
        };

        console.log(newOrder);

        const result = await this.orderRepository.save(newOrder);
        const dto: OrderDto = {
          eventId: result.eventId,
          userId: result.userId,
          bankId: result.bankId,
          amount: result.amount,
          tickets: result.tickets,
        };
        return dto;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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

  async paginate(options: IPaginateOptions) {
    try {
      const { orderId, page, limit } = options;

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
