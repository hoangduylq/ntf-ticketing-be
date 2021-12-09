import { TicketService } from './../../ticket/services/ticket.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from '../dto/order.dto';
import { OrderRepository } from '../infrastructure/order.repository';
import { StatusEnum } from 'src/modules/ticket/domain/enums/status.enum';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
    private ticketService: TicketService,
  ) {}

  async create(orderDto: OrderDto): Promise<any> {
    try {
      const { eventId, userId, bankId, amount } = orderDto;
      const status = StatusEnum.Ready;
      // const availableTickets = await this.checkAvailableTickets(eventId);
      const availableTickets = 10;
      if (amount <= availableTickets) {
        // update availableTickets
        // ...
        const entities = await this.ticketService.findTicketByEventAndStatus(
          eventId,
          status,
        );
        let tickets: string[];
        entities.forEach((entity) => {
          tickets.push(entity.nftToken);
        });
        const newOrder = {
          eventId,
          userId,
          bankId,
          amount,
          tickets,
        };

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

  // event service
  // async checkAvailableTickets(eventId: string) {
  //   const entity = await this.eventRepository.findOne({ id: eventId });
  //   return entity.availableTickets;
  // }
}
