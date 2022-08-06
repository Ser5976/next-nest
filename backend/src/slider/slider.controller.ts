import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { PictureDeleteDto } from './dto/pictureDelete.dto';
import { SliderDto } from './dto/slider.dto';
import { SliderService } from './slider.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('slider')
export class SliderController {
  constructor(private readonly SliderService: SliderService) {}
  //создание слайдера
  @UsePipes(new ValidationPipe())
  @Post()
  @Auth('admin')
  async createSlider(@Body() dto: SliderDto) {
    return this.SliderService.createSlider(dto);
  }
  @Get()
  async getSlider() {
    return this.SliderService.getSlider();
  }
  //удаление картинки
  @UsePipes(new ValidationPipe())
  @Put('delete/:id')
  @Auth()
  async deletePicture(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: PictureDeleteDto,
  ) {
    return this.SliderService.deletePicture(id, dto);
  }
  //добавление картинки
  @UsePipes(new ValidationPipe())
  @Put('add/:id')
  @Auth()
  async addPicture(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: SliderDto,
  ) {
    return this.SliderService.addPicture(id, dto);
  }
}
