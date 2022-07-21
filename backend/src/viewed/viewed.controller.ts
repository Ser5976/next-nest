import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { UserModel } from 'src/user/user.model';
import { User } from './../user/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ViewedService } from './viewed.service';
import { Body, Controller, Get, Put } from '@nestjs/common';
import { Types } from 'mongoose';

@Controller('viewed')
export class ViewedController {
  constructor(private readonly ViewedService: ViewedService) {}
  @Get()
  @Auth()
  async getViewed(@User('_id') _id: string) {
    return this.ViewedService.getViewed(_id);
  }
  @Put()
  @Auth()
  // всего юзера получаем из кастомного декоратора @User
  async setViewed(
    @User() user: UserModel,
    @Body('productId', IdValidationPipe) productId: Types.ObjectId,
  ) {
    return this.ViewedService.setViewed(user, productId);
  }
}
