import { PosterTypeService } from './poster-type.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { PosterTypeDto } from './dto/poster-type.dto';

@Controller('poster-type')
export class PosterTypeController {
  constructor(private readonly PosterTypeService: PosterTypeService) {}
  //создание постера
  @UsePipes(new ValidationPipe())
  @Post()
  @Auth('admin')
  async createPoster(@Body() dto: PosterTypeDto) {
    return this.PosterTypeService.createPoster(dto);
  }
  //получение постера одного типа
  @Get(':typeId')
  async getPoster(@Param('typeId') typeId: string) {
    return this.PosterTypeService.getPoster(typeId);
  }
  //удаление постера

  @Delete(':typeId')
  @Auth()
  async deletePicture(@Param('typeId') typeId: string) {
    return this.PosterTypeService.deletePoster(typeId);
  }
}
