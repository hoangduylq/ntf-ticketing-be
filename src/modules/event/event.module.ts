import { UploadImgServie } from './../upload-img/services/upload-img.services';
import { EventCategoryController } from './controllers/event-category.controller';
import { EventController } from './controllers/event.controller';
import { EventCategoryServie } from './services/event-category.service';
import { EventCategoryEntity } from './domain/entities/eventCategory.entity';
import { EventEntity } from './domain/entities/event.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './services/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, EventCategoryEntity])],
  exports: [EventService, EventCategoryServie],
  controllers: [EventController, EventCategoryController],
  providers: [EventService, EventCategoryServie, UploadImgServie],
})
export class EventModule {}
