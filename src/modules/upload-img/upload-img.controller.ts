import { UploadImgServie } from './services/upload-img.services';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  constructor(private readonly uploadImageServivce: UploadImgServie) {}

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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadImageServivce
      .uploadImageWithCloudinary(file)
      .then((result: any) => result.url);
    return { url: result };
  }
}
