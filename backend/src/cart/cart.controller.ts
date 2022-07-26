import { CartDto } from './dto/cart.dto';
import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { CartService } from './cart.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { User } from 'src/user/decorators/user.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly CartService: CartService) {}
  //добавление товара в корзину
  @UsePipes(new ValidationPipe()) //валидация dto
  @Put()
  @Auth()
  async addCart(
    @User('_id', IdValidationPipe) _id: string,
    @Body() dto: CartDto,
  ) {
    return this.CartService.addCart(_id, dto);
  }
  // получение корзины юзера
  @Get()
  @Auth()
  async getCart(@User('_id', IdValidationPipe) _id: string) {
    return this.CartService.getCart(_id);
  }
  // удаление товара из корзины и из массива cart у юзера
  @Delete(':id')
  @Auth()
  async removingProductCart(
    @Param('id', IdValidationPipe) id: string,
    @User('_id', IdValidationPipe) _id: string,
  ) {
    return this.CartService.removingProductCart(id, _id);
  }
  //уменьшаем количества товара
  @Delete('reduce/:id')
  @Auth()
  async reduceNumber(@Param('id', IdValidationPipe) id: string) {
    return this.CartService.reduceNumber(id);
  }
}
