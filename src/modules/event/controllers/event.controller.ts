import { PaginationEvent, Pagination } from './../dto/event.dto';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { EventEntity } from 'src/modules/event/domain/entities/event.entity';
import { EventDto } from '../dto/event.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { EventServie } from '../services/event.service';
import { Role, Roles } from 'src/modules/auth/decorator/role.decorator';

@Controller('events')
@ApiTags('events')
export class EventController {
  constructor(private readonly eventService: EventServie) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
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

  @Get()
  async getAllEvent(@Query() query: PaginationEvent): Promise<EventEntity[]> {
    try {
      const { page, pageSize, ...rest } = query || {};
      return await this.eventService.getAllEvent(rest, {
        page,
        pageSize,
      } as Pagination);
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
