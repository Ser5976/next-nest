import { SearchDto } from './dto/search.dto';
import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { UpdateReviewDto } from './dto/update.review.dto';
import { ReviewsDto } from './dto/reviews.dto';
import { ReviewsService } from './reviews.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { User } from 'src/user/decorators/user.decorator';
import { ResponseDto } from './dto/response.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly ReviewsService: ReviewsService) {}
  //создание отзыва
  @UsePipes(new ValidationPipe())
  @Post()
  @Auth()
  async create(
    @User('_id', IdValidationPipe) _id: string,
    @Body() dto: ReviewsDto,
  ) {
    return this.ReviewsService.create(_id, dto);
  }
  // получение отзыва пользователя
  @Get('user-reviews')
  @Auth()
  async getReviews(@User('_id', IdValidationPipe) _id: string) {
    return this.ReviewsService.getUserReviews(_id);
  }
  //получение отзывов о магазине
  @Get('store-reviews')
  async getStoreReviews() {
    return this.ReviewsService.getStoreReviews();
  }
  // admin
  // получение всех отзывов
  @Auth('admin')
  @Get()
  async getAllReviews() {
    return this.ReviewsService.getAllReviews();
  }
  //поиск отзыва по name
  @Auth('admin')
  @Get('search')
  async findReviews(@Query() dto: SearchDto) {
    return this.ReviewsService.findReviews(dto);
  }
  //-------------------------------------------
  //получение отзывов продукта
  @Get(':productId')
  async getProductReviews(
    @Param('productId', IdValidationPipe) productId: string,
  ) {
    return this.ReviewsService.getProductReviews(productId);
  }

  //редактирование отзыва
  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Auth()
  async updateReview(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateReviewDto,
  ) {
    // console.log('id:', id);
    return this.ReviewsService.updateReview(id, dto);
  }

  // admin
  //ответ на отзыв
  @UsePipes(new ValidationPipe())
  @Put('response-review/:id')
  @Auth('admin')
  async responseReviews(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: ResponseDto,
  ) {
    return this.ReviewsService.responseReview(id, dto);
  }
  //удаление отзыва
  @Delete(':id')
  @Auth()
  async deleteRrview(
    @Param('id', IdValidationPipe) id: string,
    @User('_id', IdValidationPipe) _id: string,
  ) {
    return this.ReviewsService.deleteReview(id, _id);
  }
}
