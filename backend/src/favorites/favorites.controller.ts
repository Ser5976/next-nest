import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { UserModel } from 'src/user/user.model';
import { FavoritesService } from './favorites.service';
import { Body, Controller, Get, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { User } from 'src/user/decorators/user.decorator';
import { Types } from 'mongoose';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly FavoritesService: FavoritesService) {}
  @Get()
  @Auth()
  async getFavorites(@User('_id') _id: string) {
    return this.FavoritesService.getFavorites(_id);
  }
  @Put()
  @Auth()
  // всего user получаем из кастомного декоратора @User
  async setFavorites(
    @User() user: UserModel,
    @Body('productId', IdValidationPipe) productId: Types.ObjectId,
  ) {
    return this.FavoritesService.setFavorites(user, productId);
  }
}
