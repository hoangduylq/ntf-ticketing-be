import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { EventEntity } from 'src/modules/event/domain/entities/event.entity';
import { EventDto } from '../dto/event.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EventServie } from '../services/event.service';
import { Role, Roles } from 'src/modules/auth/decorator/role.decorator';

@Controller('events')
@ApiTags('events')
export class EventController {
  constructor(private readonly eventService: EventServie) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  async createEvent(@Body() model: EventDto) {
    return this.eventService.create(model);
  }

  @Put('/:eventId')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  async updateEvent(
    @Request() req,
    @Param('eventId') eventId: string,
    @Body() eventInfo: EventDto,
  ): Promise<any> {
    const { user } = req;
    return await this.eventService.updateEventDetail(
      eventId,
      user.id,
      eventInfo,
    );
  }

  @Get('/:eventId')
  async getEvent(@Param('eventId') eventId: string): Promise<EventEntity> {
    return await this.eventService.getEventById(eventId);
  }

  @Get('')
  async getAllEvent(): Promise<EventEntity[]> {
    return await this.eventService.getAllEvent();
  }
}
