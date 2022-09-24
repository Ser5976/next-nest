import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { SliderDto } from './dto/slider.dto';
import { SliderService } from './slider.service';
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

@Controller('slider')
export class SliderController {
  constructor(private readonly SliderService: SliderService) {}
  //создание слайдера
  @UsePipes(new ValidationPipe())
  @Post()
  @Auth('admin')
  async createSlider(@Body() dto: SliderDto) {
    return this.SliderService.addPicture(dto);
  }
  @Get()
  async getSlider() {
    return this.SliderService.getSlider();
  }
  //удаление картинки
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @Auth()
  async deletePicture(@Param('id', IdValidationPipe) id: string) {
    return this.SliderService.deletePicture(id);
  }
}
