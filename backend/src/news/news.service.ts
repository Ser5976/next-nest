import { NewsDto } from './dto/news.dto';
import { NewsModel } from './news.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(NewsModel) private readonly NewsModel: ModelType<NewsModel>,
  ) {}

  //создание статьи
  async createNews(dto: NewsDto) {
    const name = await this.NewsModel.findOne({ name: dto.name });
    if (name)
      throw new BadRequestException('Новость с таким названием уже существует');
    const news = await this.NewsModel.create(dto);
    if (!news)
      throw new NotFoundException('Что то пошло не так,статья не сохранена');
    return news;
  }
  // получение статей(или поиск),сортировка ставит последнюю созданную статью в начало
  async getAllNews(dto: SearchDto) {
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
    const news = await this.NewsModel.find(options).sort({ createdAt: 'desc' });
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
