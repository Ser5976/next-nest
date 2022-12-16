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
  // получение всех отзывов
  async getAllReviews(): Promise<DocumentType<ReviewsModel>[]> {
    const allReviews = await this.ReviewsModel.find()
      .populate('userId')
      .sort({ createdAt: 'desc' })
      .exec();
    if (allReviews) return allReviews;
    throw new NotFoundException('Отзывы не получены');
  }
  // поиск  отзыва  по name
  async findReviews(dto: SearchDto): Promise<DocumentType<ReviewsModel>[]> {
    console.log('Поиск:', dto);
    const reviews = await this.ReviewsModel.find({
      $or: [{ name: new RegExp(dto.name, 'i') }],
    }).populate('userId');
    return reviews;
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
  async deleteReview(id: string, _id: string): Promise<{ message: string }> {
    const deletedReview = await this.ReviewsModel.findByIdAndDelete(id);
    if (deletedReview) {
      //удаление id отзыва у юзера
      await this.UserModel.updateOne(
        { _id },
        {
          $pull: { reviews: new Types.ObjectId(id) },
        },
      );
    }
    if (!deletedReview) throw new NotFoundException('отзыв не удален');
    return { message: 'отзыв удалён' };
  }
}
