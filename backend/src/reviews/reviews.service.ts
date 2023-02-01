import { UserModel } from './../user/user.model';
import { UpdateReviewDto } from './dto/update.review.dto';
import { ReviewsDto } from './dto/reviews.dto';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { ReviewsModel } from './reviews.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';
import { ResponseDto } from './dto/response.dto';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(ReviewsModel)
    private readonly ReviewsModel: ModelType<ReviewsModel>,
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}
  //создание отзывов
  async create(id: string, dto: ReviewsDto) {
    const reveiw = await this.ReviewsModel.create({
      userId: id,
      ...dto,
    });

    if (reveiw) {
      //сохраняем id отзыва юзеру
      await this.UserModel.updateOne(
        { _id: id },
        {
          $push: { reviews: reveiw._id },
        },
      );
      return reveiw;
    }

    throw new NotFoundException('Ваш отзыв не принят,попробуйте ещё раз');
  }
  // получение отзывов пользователя
  async getUserReviews(id: string): Promise<DocumentType<ReviewsModel>[]> {
    const reviews = await this.ReviewsModel.find({ userId: id }).sort({
      createdAt: 'desc',
    });

    if (reviews) return reviews;
    throw new NotFoundException('Отзывы не получены');
  }
  // получение отзывов  о магазине
  async getStoreReviews(): Promise<DocumentType<ReviewsModel>[]> {
    const reviews = await this.ReviewsModel.find({ store: 'store' }).sort({
      createdAt: 'desc',
    });
    if (reviews) return reviews;
    throw new NotFoundException('Отзывы не получены');
  }
  // получение отзывов  продукта
  async getProductReviews(
    productId: string,
  ): Promise<DocumentType<ReviewsModel>[]> {
    const reviews = await this.ReviewsModel.find({ productId }).sort({
      createdAt: 'desc',
    });
    if (reviews) return reviews;
    throw new NotFoundException('Отзывы не получены');
  }

  // редактирование отзыва
  async updateReview(
    idReview: string,
    dto: UpdateReviewDto,
  ): Promise<{ message: string }> {
    const newReview = await this.ReviewsModel.findByIdAndUpdate(idReview, dto, {
      new: true,
    }).exec();
    if (newReview) return { message: 'отзыв обновлён' };
    throw new NotFoundException('отзыв не обновлён');
  }
  // admin
  // получение(или поиск по name) всех отзывов
  async getAllReviews(dto: SearchDto): Promise<{
    allReviews: DocumentType<ReviewsModel>[];
    quantity: number;
  }> {
    let options = {};
    if (dto.name) {
      options = {
        $or: [
          {
            name: new RegExp(dto.name, 'i'),
          },
        ],
      };
    }
    const allReviews = await this.ReviewsModel.find(options)
      .populate('userId')
      .sort({ createdAt: 'desc' })
      .exec();
    if (!allReviews) throw new NotFoundException('Отзывы не получены');
    const quantity = await this.ReviewsModel.find().count().exec();
    return { allReviews, quantity };
  }

  //ответ на отзыв
  async responseReview(id: string, dto: ResponseDto) {
    const responseReview = await this.ReviewsModel.findByIdAndUpdate(id, {
      response: dto.response,
    });
    if (!responseReview)
      throw new NotFoundException('Что то пошло не так,ответ не записан');
    return { message: 'Ответ записан' };
  }
  //удаление отзыва
  async deleteReview(id: string): Promise<{ message: string }> {
    const deletedReview = await this.ReviewsModel.findByIdAndDelete(id);
    // console.log('Айди юзера:', deletedReview.userId);
    if (deletedReview.userId) {
      //удаление id отзыва у юзера
      await this.UserModel.updateOne(
        { _id: deletedReview.userId },
        {
          $pull: { reviews: new Types.ObjectId(id) },
        },
      );
    }
    if (!deletedReview) throw new NotFoundException('отзыв не удален');
    return { message: 'отзыв удалён' };
  }
}
