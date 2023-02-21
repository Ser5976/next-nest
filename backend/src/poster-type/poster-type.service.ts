import { UpdatePosterDto } from './dto/udatePoster.dto';
import { PosterTypeModel } from './poster-type.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { PosterTypeDto } from './dto/poster-type.dto';

@Injectable()
export class PosterTypeService {
  constructor(
    @InjectModel(PosterTypeModel)
    private readonly PosterTypeModel: ModelType<PosterTypeModel>,
  ) {}
  //добавление постера
  async createPoster(
    dto: PosterTypeDto,
  ): Promise<DocumentType<PosterTypeModel>> {
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
  //получение всех постеров
  async getPosters(): Promise<DocumentType<PosterTypeModel>[]> {
    const posters = await this.PosterTypeModel.find().populate('typeId');
    if (!posters) throw new NotFoundException('Что то пошло не так');
    return posters;
  }

  //получение постера типа товара
  async getPoster(typeId: string): Promise<DocumentType<PosterTypeModel>> {
    const posterType = await this.PosterTypeModel.findOne({ typeId: typeId });
    if (!posterType) throw new NotFoundException('Что то пошло не так');
    return posterType;
  }
  // редактировать пост
  async updatePoster(dto: UpdatePosterDto): Promise<{ message: string }> {
    const posterUpdate = await this.PosterTypeModel.updateOne(
      { _id: dto.posterId },
      { picture: dto.picture },
    );
    if (!posterUpdate) throw new NotFoundException('Что то пошло не так');
    return { message: 'Постер изменён' };
  }

  //удаление постера
  async deletePoster(posterId: string) {
    await this.PosterTypeModel.findOneAndDelete({ _id: posterId });
    return { message: 'Постер удален' };
  }
}
