import { PosterTypeModel } from './poster-type.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { PosterTypeDto } from './dto/poster-type.dto';

@Injectable()
export class PosterTypeService {
  constructor(
    @InjectModel(PosterTypeModel)
    private readonly PosterTypeModel: ModelType<PosterTypeModel>,
  ) {}
  //добавление постера
  async createPoster(dto: PosterTypeDto) {
    console.log(dto);
    //делаем проверку если такой постер имеется у типа товаров, то новый создавать не будем
    const check = await this.PosterTypeModel.findOne({ typeId: dto.typeId });
    if (check)
      throw new BadRequestException('Постер у этого типа товаров  уже есть');
    const poster = await this.PosterTypeModel.create(dto);
    if (!poster)
      throw new NotFoundException('Что то пошло не так,коллекция не создана');
    return poster;
  }
  //получение постера типа товара
  async getPoster(typeId: string) {
    const posterType = await this.PosterTypeModel.findOne({ typeId: typeId });
    if (!posterType) throw new NotFoundException('Что то пошло не так');
    return posterType;
  }
  //удаление постера
  async deletePoster(typeId: string) {
    await this.PosterTypeModel.findOneAndDelete({ typeId });
    return { message: 'Постер удален' };
  }
}
