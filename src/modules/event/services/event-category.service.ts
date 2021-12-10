import { EventCategoryEntity } from './../domain/entities/eventCategory.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventCategoryServie {
  constructor(
    @InjectRepository(EventCategoryEntity)
    private eventCategoryRespository: Repository<EventCategoryEntity>,
  ) {}

  async getAll(): Promise<EventCategoryEntity[]> {
    const listCategory = await this.eventCategoryRespository.find();
    return listCategory;
  }
}
