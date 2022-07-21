import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ViewedService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}
  //получаем массив просмотренных товаров
  async getViewed(id: string) {
    const viewed = await this.UserModel.findById(id)
      .populate('viewed')
      .sort({ createdAt: 'desc' })
      .exec()
      .then((data) => data.viewed); // так можно получить только поле favorites
    if (viewed) return viewed;
    throw new NotFoundException('Список просмотренных  продуктов не получен');
  }
  // записываем или удаляем id товара из массива просмотренных(если есть, удаляем и добавляем, если нет)
  async setViewed(user: UserModel, productId: Types.ObjectId) {
    const { _id, viewed } = user;
    const newViewed = this.UserModel.findByIdAndUpdate(
      _id,
      {
        viewed: viewed.includes(productId)
          ? viewed.filter((id) => String(id) !== String(productId))
          : [...viewed, productId],
      },
      { new: true },
    );
    if (newViewed) return newViewed;
    throw new NotFoundException('Изменение не произошло');
  }
}
