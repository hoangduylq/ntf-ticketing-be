import { EventCategoryServie } from './../services/event-category.service';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventServie } from '../services/event.service';

@Controller('events')
@ApiTags('events')
export class EventController {
  constructor(
    private readonly eventService: EventServie,
    private readonly categorySerive: EventCategoryServie,
  ) {}

  async createEvent(eventDto: EventDto) {}
}
