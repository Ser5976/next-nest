import { ProductModel } from 'src/product/product.model';
import { RatingDto } from './dto/rating.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RatingModel } from './rating.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(RatingModel)
    private readonly RatingModel: ModelType<RatingModel>,
    @InjectModel(ProductModel)
    private readonly ProductModel: ModelType<ProductModel>,
  ) {}
  async setRating(userId: string, dto: RatingDto) {
    const { productId, value } = dto;

    //ищем рейтинг юзера, если находим-изменяем,если нет-создаём
    const newRating = await this.RatingModel.findOneAndUpdate(
      { userId, productId }, //поиск
      { userId, productId, value }, //обновляем
      { upsert: true, new: true, setDefaultsOnInsert: true }, // если нету - создаём
    ).exec();
    if (!newRating) throw new NotFoundException('ваша оценка не отправлена');

    //расчёт рейтинга

    const numberRatings = await this.RatingModel.find({
      productId,
    })
      .count()
      .exec(); // находим количество оценок
    // console.log('число', numberRatings);
    //при помощи агрегации рассчитываем среднее значение
    const avgRating = await this.RatingModel.aggregate()
      .group({ _id: productId, average: { $avg: '$value' } })
      .exec();
    // console.log(avgRating);
    if (!avgRating[0].average)
      throw new NotFoundException('рейтинг не рассчитан');
    const estimation = avgRating[0].average.toFixed(1);
    // console.log('оценка:', estimation);
    // изменяем рейтинг в товаре
    const ratingProduct = await this.ProductModel.findByIdAndUpdate(productId, {
      rating: { estimation, numberRatings },
    }).exec();
    if (!ratingProduct) throw new NotFoundException('рейтинг не изменён');
    return { message: 'рейтинг изменён' };
  }
}
