import { EventEntity } from 'src/modules/event/domain/entities/event.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventServie {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  // async create(eventDto: EventDto): Promise<EventDto>{

  // }
}
