import { UploadController } from './controllers/upload-img.controller';
import { UploadImgServie } from './services/upload-img.services';
import { Module } from '@nestjs/common';
// import { v2 as cloudinary } from 'cloudinary';
import { ConfigModule } from '@nestjs/config';

@Module({
  exports: [UploadImgServie],
  controllers: [UploadController],
  imports: [ConfigModule],
  providers: [UploadImgServie],
})
export class UploadImgModule {}
