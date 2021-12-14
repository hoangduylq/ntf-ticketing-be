import { Pagination } from './../dto/event.dto';
import { StatusEventEnum } from './../domain/enums/status.enum';
import { EventDto, PaginationEvent } from '../dto/event.dto';
import { EventEntity } from 'src/modules/event/domain/entities/event.entity';
import { Like, Repository } from 'typeorm';
import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @Inject(REQUEST) private readonly req: any,
  ) {}

  async create(createEventDto: EventDto): Promise<any> {
    try {
      const newEvent = this.eventRepository.create(createEventDto);
      await this.eventRepository.save(newEvent);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Event Successfully',
      };
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

      for (const field in query) {
        if (typeof query[field] === 'string') {
          query[field] = Like(`%${query[field]}%`);
        }
      }

      return await this.eventRepository.find({
        where: query,
        skip: skipAmount,
        take: pageSize,
        order: {
          categoryId: 'ASC',
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async getEventById(id: string): Promise<EventEntity | undefined> {
    try {
      const event = this.eventRepository.findOneOrFail({ id });
      if (!event) {
        throw new NotFoundException('Event not found');
      }
      return event;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
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

  async updateEventDetail(id: string, eventDetail: any): Promise<any> {
    try {
      const user = this.req.user;
      const event = await this.getEventById(id);
      if (event.userId === user.id) {
        const result = await this.eventRepository.update(event.id, eventDetail);
        return result;
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
