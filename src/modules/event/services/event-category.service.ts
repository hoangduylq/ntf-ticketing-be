import { EventCategoryEntity } from './../domain/entities/eventCategory.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventCategoryServie {
  constructor(
    @InjectRepository(EventCategoryEntity)
    private eventCategoryRespository: Repository<EventCategoryEntity>,
  ) {}

  async getAll(): Promise<EventCategoryEntity[]> {
    try {
      return await this.eventCategoryRespository.find();
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
