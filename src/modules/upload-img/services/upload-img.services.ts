import {
  Injectable,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { resolve } from 'path';
cloudinary.config({
  cloud_name: 'dnhxzvdy2',
  api_key: '786919995595549',
  api_secret: 'WHgCpYeoOjmvHjkGkLs5do5NAZA',
});

@Injectable()
export class UploadImgServie {
  async uploadImageToCloudinary(@UploadedFile() file) {
    try {
      console.log(__dirname);
      const dir = resolve(__dirname, 'download.jpg');
      console.log('dir', dir);
      const a = await cloudinary.uploader.upload('download.jpg', {
        folder: dir,
      });
      console.log('a', a);
      return a;
    } catch (error) {
      console.log(error);
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
