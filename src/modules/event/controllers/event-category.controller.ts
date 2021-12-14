import { EventCategoryEntity } from './../domain/entities/eventCategory.entity';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventCategoryServie } from '../services/event-category.service';

@Controller('categories')
@ApiTags('categories')
export class EventCategoryController {
  constructor(private readonly cateogryService: EventCategoryServie) {}

  @Get('')
  getAllCategories(): Promise<EventCategoryEntity[]> {
    return this.cateogryService.getAll();
  }
}
