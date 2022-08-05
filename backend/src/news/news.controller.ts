import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { NewsDto } from './dto/news.dto';
import { NewsService } from './news.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('news')
export class NewsController {
  constructor(private readonly NewsService: NewsService) {}
  //создание статьи
  @UsePipes(new ValidationPipe())
  @Post()
  @Auth('admin')
  async createNews(@Body() dto: NewsDto) {
    return this.NewsService.createNews(dto);
  }
  // получение всех статей
  @Get()
  async getAllNews() {
    return this.NewsService.getAllNews();
  }
  // получение  статьи
  @Get(':id')
  async getNews(@Param('id', IdValidationPipe) id: string) {
    return this.NewsService.getNews(id);
  }
  // редактирование статьи
  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Auth('admin')
  async updateNews(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: NewsDto,
  ) {
    return this.NewsService.updateNews(id, dto);
  }
  // удаление  статьи
  @Delete(':id')
  @Auth('admin')
  async deleteNews(@Param('id', IdValidationPipe) id: string) {
    return this.NewsService.deleteNews(id);
  }
}
