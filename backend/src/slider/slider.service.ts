import { SliderDto } from './dto/slider.dto';
import { SliderModel } from './slider.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class SliderService {
  constructor(
    @InjectModel(SliderModel)
    private readonly SliderModel: ModelType<SliderModel>,
  ) {}
  //добавление картинки
  async addPicture(dto: SliderDto) {
    //console.log(img);
    const picture = await this.SliderModel.create(dto);
    if (!picture)
      throw new NotFoundException('Что то пошло не так,коллекция не создана');
    return picture;
  }
  //получение коллекции
  async getSlider() {
    const slider = await this.SliderModel.find();
    if (!slider) throw new NotFoundException('Что то пошло не так');
    return slider;
  }
  //удаление картинки
  async deletePicture(id: string) {
    const deleteFile = await this.SliderModel.findByIdAndDelete(id);
    return deleteFile;
  }
}
