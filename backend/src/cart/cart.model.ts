import { ProductModel } from 'src/product/product.model';
import { UserModel } from 'src/user/user.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface CartModel extends Base {}

export class CartModel extends TimeStamps {
  @prop({ ref: () => UserModel })
  userId: Ref<UserModel>;

  @prop({ ref: () => ProductModel })
  productId: Ref<ProductModel>;

  @prop()
  name: string;

  @prop()
  price: number;

  @prop()
  picture: string;

  @prop()
  oldPrice?: number;

  @prop({ default: 0 })
  totalPrice: number;

  @prop({ default: 0 })
  totalOldPrice: number;

  @prop({ default: 1 })
  quantity: number;
}
