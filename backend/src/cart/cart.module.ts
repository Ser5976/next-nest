import { UserModel } from 'src/user/user.model';
import { CartModel } from './cart.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CartModel,
        schemaOptions: {
          collection: 'Cart',
        },
      },
    ]),
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
