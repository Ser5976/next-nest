import { FileService } from './file.service';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { FilesInterceptor } from '@nestjs/platform-express';

//создание картинки
@Controller('file')
export class FileController {
  constructor(private readonly FileService: FileService) {}
  @Post()
  @Auth('admin')
  @UseInterceptors(FilesInterceptor('files')) //специальный декоратор для работы с файлами
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    return this.FileService.uploadFile(files);
  }
  // удаление картинки
  @Post('remove')
  @Auth('admin')
  async removeFile(@Body() dto: { files: string[] | string }) {
    return this.FileService.removeFile(dto);
  }
}
