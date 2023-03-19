import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { UserModel } from 'src/user/user.model';
import { User } from './../user/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { ViewedService } from './viewed.service';
import { Controller, Get, Param, Put } from '@nestjs/common';

@Controller('viewed')
export class ViewedController {
  constructor(private readonly ViewedService: ViewedService) {}
  /* @Get()
  @Auth()
  async getViewed(@User('_id') _id: string) {
    return this.ViewedService.getViewed(_id);
  } */
  @Put(':productId')
  @Auth()
  // всего юзера получаем из кастомного декоратора @User
  async setViewed(
    @User() user: UserModel,
    @Param('productId', IdValidationPipe) productId: string,
  ) {
    return this.ViewedService.setViewed(user, productId);
  }
}
