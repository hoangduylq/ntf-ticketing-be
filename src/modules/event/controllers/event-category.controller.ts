import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventCategoryServie } from '../services/event-category.service';

@Controller('categories')
@ApiTags('categories')
export class EventCategoryController {
  constructor(private readonly cateogryService: EventCategoryServie) {}

  @Get('')
  getAllCategories() {
    return this.cateogryService.getAll();
  }
}
