import { Pagination } from './../dto/event.dto';
import { StatusEventEnum } from './../domain/enums/status.enum';
import { EventDto, PaginationEvent } from '../dto/event.dto';
import { EventEntity } from 'src/modules/event/domain/entities/event.entity';
import { Like, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async getAllEvent(
    query: PaginationEvent,
    pagination: Pagination,
  ): Promise<EventEntity[]> {
    try {
      const { page = 1, pageSize = 0 } = pagination;
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
    } catch (err) {
      throw new HttpException(
        `[EventService]: ${err?.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getEventById(id: string): Promise<EventEntity | undefined> {
    try {
      const event = this.eventRepository.findOneOrFail({ id });
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return event;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createEventDto: EventDto): Promise<any> {
    try {
      const newEvent = this.eventRepository.create(createEventDto);
      await this.eventRepository.save(newEvent);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Create Event Successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateEventDetail(
    id: string,
    userId: string,
    eventDetail: any,
  ): Promise<any> {
    try {
      const event = await this.getEventById(id);
      if (event.userId === userId) {
        const result = await this.eventRepository.update(event.id, eventDetail);
        return result;
      } else {
        throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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
