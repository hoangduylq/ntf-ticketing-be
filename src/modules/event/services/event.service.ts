import { StatusEventEnum } from './../domain/enums/status.enum';
import { EventDto } from '../dto/event.dto';
import { EventEntity } from 'src/modules/event/domain/entities/event.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventServie {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async getAllEvent(): Promise<EventEntity[]> {
    return await this.eventRepository.find();
  }

  async getAllEventWithUserId(userId: string): Promise<EventEntity[]> {
    return await this.eventRepository.find({ userId });
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
    eventDetail: EventDto,
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
}
