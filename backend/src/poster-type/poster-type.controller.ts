import { PosterTypeService } from './poster-type.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { PosterTypeDto } from './dto/poster-type.dto';
import { UpdatePosterDto } from './dto/udatePoster.dto';

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
  //получение всех постеров
  @Get()
  @Auth('admin')
  async getPosters() {
    return this.PosterTypeService.getPosters();
  }
  //получение постера одного типа
  @Get(':typeId')
  async getPoster(@Param('typeId') typeId: string) {
    return this.PosterTypeService.getPoster(typeId);
  }
  // редактирование постера
  @UsePipes(new ValidationPipe())
  @Put()
  @Auth('admin')
  async updatePoster(@Body() dto: UpdatePosterDto) {
    return this.PosterTypeService.updatePoster(dto);
  }

  //удаление постера
  @Delete(':typeId')
  @Auth('admin')
  async deletePicture(@Param('typeId') typeId: string) {
    return this.PosterTypeService.deletePoster(typeId);
  }
}
