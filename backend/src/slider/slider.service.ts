import { PictureDeleteDto } from './dto/pictureDelete.dto';
import { SliderDto } from './dto/slider.dto';
import { SliderModel } from './slider.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class SliderService {
  //создание модели для слайдера(создаём только одну коллекцию(массив картинок),
  //дальше работаем с удалением и добавлением картинок внутри коллекции)
  constructor(
    @InjectModel(SliderModel)
    private readonly SliderModel: ModelType<SliderModel>,
  ) {}
  async createSlider(img: SliderDto) {
    //console.log(img);
    const picture = await this.SliderModel.create(img);
    if (!picture)
      throw new NotFoundException('Что то пошло не так,коллекция не создана');
    return picture;
  }
  //получение коллекции
  async getSlider() {
    const slider = await this.SliderModel.find().then((data) => {
      return { picture: data[0].picture, id: data[0]._id }; //получаем объект из массива картинок и _id
    });

    return slider;
  }
  //удаление картинки
  async deletePicture(id: string, dto: PictureDeleteDto) {
    await this.SliderModel.updateOne(
      { _id: id },
      { $pull: { picture: dto.picture } },
    );
    return { message: 'Картинка удалена' };
  }
  //добавление картинки
  async addPicture(id: string, dto: SliderDto) {
    await this.SliderModel.updateOne(
      { _id: id },
      { $push: { picture: { $each: dto.picture } } }, // мы добавляем массив,состоящий из одной или нескольких картинок ,
      //$each помогает нам встроить элементы массива в массив ,без лишней вложенности
    );
    return { message: 'Картинка сохранена' };
  }
}
