import { NewsDto } from './dto/news.dto';
import { NewsModel } from './news.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(NewsModel) private readonly NewsModel: ModelType<NewsModel>,
  ) {}

  //создание статьи
  async createNews(dto: NewsDto) {
    const news = await this.NewsModel.create(dto);
    if (!news)
      throw new NotFoundException('Что то пошло не так,статья не сохранена');
    return news;
  }
  // получение статей
  async getAllNews() {
    const news = await this.NewsModel.find();
    if (!news)
      throw new NotFoundException('Что то пошло не так,статьи не получены');
    return news;
  }
  // получение статьи
  async getNews(id: string) {
    const news = await this.NewsModel.findById(id);
    if (!news)
      throw new NotFoundException('Что то пошло не так,статья не получена');
    return news;
  }
  // редактирование статьи
  async updateNews(id: string, dto: NewsDto) {
    const newNews = await this.NewsModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!newNews)
      throw new NotFoundException(
        'Что то пошло не так,статья не отредактирована',
      );
    return newNews;
  }
  // удаление статьи
  async deleteNews(id: string) {
    const deleteNews = await this.NewsModel.findByIdAndDelete(id);
    if (!deleteNews)
      throw new NotFoundException('Что то пошло не так,статья не удалена');
    return deleteNews;
  }
}
