import { ResponseDto } from './dto/response.dto';
import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { StoreReviewsDto } from './dto/store-reviews.dto';
import { StoreReviewsService } from './store-reviews.service';
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

@Controller('store-reviews')
export class StoreReviewsController {
  constructor(private readonly StoreReviewsService: StoreReviewsService) {}
  //создание отзыва
  @UsePipes(new ValidationPipe())
  @Post()
  async createNews(@Body() dto: StoreReviewsDto) {
    return this.StoreReviewsService.createStoreReveiws(dto);
  }
  // получение всех отзывов
  @Get()
  async getAllNews() {
    return this.StoreReviewsService.getStoreReviews();
  }
  // admin
  //ответ на отзыв
  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Auth('admin')
  async responseReviews(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: ResponseDto,
  ) {
    return this.StoreReviewsService.responseReview(id, dto);
  }
  //удаление отзыва
  @Delete(':id')
  @Auth('admin')
  async deleteNews(@Param('id', IdValidationPipe) id: string) {
    return this.StoreReviewsService.deleteNews(id);
  }
}
