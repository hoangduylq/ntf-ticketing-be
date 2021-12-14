import { UploadImgService } from '../services/upload-img.services';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
// import { query } from 'express';

@Controller('image')
@ApiTags('image')
export class UploadController {
  constructor(private readonly uploadImageServivce: UploadImgService) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadImageServivce.uploadImageWithCloudinary(
      file,
    );
    console.log(result);
    return { url: result };
  }

  @Delete('/:publicId')
  async deleteImage(@Query('publicId') publicId: string) {
    const result = await this.uploadImageServivce.deleteImageInCloundinary(
      publicId,
    );
    return { result };
  }
}
