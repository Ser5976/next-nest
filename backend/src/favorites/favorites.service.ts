import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}
  //получаем массив favorites(это избранное)
  // этот запрос не нужен, но удалять не хочу т.к. есть пример с then
  /* async getFavorites(id: string) {
    const favorites = await this.UserModel.findById(id)
      .populate('favorites')
      .exec()
      .then((data) => data.favorites); // так можно получить только поле favorites
    if (favorites) return favorites;
    throw new NotFoundException('Список избранных продуктов не получен');
  } */

  // записываем или удаляем id продукта из массива избранного(если есть удаляем , если нет добавляем )
  async setFavorites(user: UserModel, productId: string) {
    const { _id, favorites } = user;
    const newFavorites = this.UserModel.findByIdAndUpdate(
      _id,
      {
        //метод массивов includes проверяет есть ли такое значение в массиве, если есть возвращает true, если нет false
        //если условие  выполнится тогда методом  filter пробегаемся по массиву и перезаписываем только те значения ,
        //которые не равны выбранному productId
        // если условие не сработало - записываем productId в массив favorites
        favorites: favorites.includes(new Types.ObjectId(productId))
          ? favorites.filter((id) => String(id) !== String(productId))
          : [...favorites, productId],
      },
      { new: true },
    );
    if (newFavorites) return newFavorites;
    throw new NotFoundException('Изменение не произошло');
  }
}
