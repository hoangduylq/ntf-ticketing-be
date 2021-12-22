import { Pagination } from './../dto/event.dto';
import { StatusEventEnum } from './../domain/enums/status.enum';
import { EventDto, PaginationEvent } from '../dto/event.dto';
import { EventEntity } from 'src/modules/event/domain/entities/event.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async create(createEventDto: EventDto): Promise<EventEntity> {
    try {
      const newEvent = this.eventRepository.create(createEventDto);
      await this.eventRepository.save(newEvent);
      return newEvent;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async getEvents(): Promise<EventEntity[]> {
    try {
      return await this.eventRepository.find();
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async getEventPaging(
    query: PaginationEvent,
    pagination: Pagination,
  ): Promise<EventEntity[]> {
    try {
      const { page = 1, pageSize = 5 } = pagination;
      const skipAmount = (page - 1) * pageSize;

      // for (const field in query) {
      //   if (typeof query[field] === 'string') {
      //     query[field] = Like(`%${query[field]}%`);
      //   }
      // }

      return await this.eventRepository.find({
        where: query,
        skip: skipAmount,
        take: pageSize,
        order: {
          name: 'ASC',
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async getEventById(id: string): Promise<EventEntity> {
    const event = await this.eventRepository.findOne({ id });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async updateStatusEvent(
    id: string,
    status: StatusEventEnum,
  ): Promise<EventEntity> {
    try {
      const event = await this.getEventById(id);
      event.status = status;
      const eventUpdated = this.eventRepository.save(event);
      return eventUpdated;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async updateEventDetail(
    id: string,
    eventDetail: EventDto,
    userId: string,
  ): Promise<EventEntity> {
    try {
      const event = await this.getEventById(id);
      if (event.userId === userId) {
        const eventUpdated = await this.eventRepository.save({
          ...event,
          ...eventDetail,
        });
        return eventUpdated;
      } else {
        throw new UnauthorizedException('Permission Denied');
      }
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async checkAvailableTickets(eventId: string) {
    const entity = await this.getEventById(eventId);
    return entity.availableTickets;
  }

  async updateAvaiableTickets(eventId: string, amountTicketBuy: number) {
    const entity = await this.getEventById(eventId);
    const availableTickets: number = entity.availableTickets - amountTicketBuy;

    const status =
      availableTickets > 0 ? StatusEventEnum.Ready : StatusEventEnum.Pending;

    const result = await this.eventRepository.update(
      { id: eventId },
      { availableTickets: availableTickets, status: status },
    );
    return result;
  }
}
