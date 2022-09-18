import { ResponseDto } from './dto/response.dto';
import { StoreReviewsModel } from './store-reviews.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { StoreReviewsDto } from './dto/store-reviews.dto';

@Injectable()
export class StoreReviewsService {
  constructor(
    @InjectModel(StoreReviewsModel)
    private readonly StoreReviewsModel: ModelType<StoreReviewsModel>,
  ) {}
  // создание отзыва
  async createStoreReveiws(dto: StoreReviewsDto) {
    const storeReviews = await this.StoreReviewsModel.create(dto);
    if (!storeReviews)
      throw new NotFoundException('Что то пошло не так,отзыв не создан');
    return storeReviews;
  }
  // получение отзывов(сортиравка:последний будет первым)
  async getStoreReviews() {
    const storeReviews = await this.StoreReviewsModel.find().sort({
      createdAt: 'desc',
    });
    if (!storeReviews)
      throw new NotFoundException('Что то пошло не так,отзывы не получены');
    return storeReviews;
  }
  // admin
  //ответ на отзыв
  async responseReview(id: string, dto: ResponseDto) {
    const responseReview = await this.StoreReviewsModel.findByIdAndUpdate(id, {
      response: dto.response,
    });
    if (!responseReview)
      throw new NotFoundException('Что то пошло не так,ответ не записан');
    return { message: 'Ответ записан' };
  }
  // удаление отзыва
  async deleteNews(id: string) {
    const deleteReview = await this.StoreReviewsModel.findByIdAndDelete(id);
    if (!deleteReview)
      throw new NotFoundException('Что то пошло не так,отзыв не удален');
    return { message: 'Отзыв удалён' };
  }
}
