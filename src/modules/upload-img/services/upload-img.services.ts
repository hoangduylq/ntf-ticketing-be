import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import toStream = require('buffer-to-stream');

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });
cloudinary.config({
  cloud_name: 'dnhxzvdy2',
  api_key: '786919995595549',
  api_secret: 'WHgCpYeoOjmvHjkGkLs5do5NAZA',
});

@Injectable()
export class UploadImgServie {
  async uploadImageWithCloudinary(file: Express.Multer.File) {
    try {
      if (!file)
        throw new HttpException(
          'No files were uploaded',
          HttpStatus.BAD_REQUEST,
        );

      if (file.size > 1024 * 1024) {
        throw new HttpException('Size too large', HttpStatus.BAD_REQUEST);
      }

      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        throw new HttpException(
          'File format is incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }

      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });

        toStream(file.buffer).pipe(upload);
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
