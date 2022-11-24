import { ProductModel } from './../product/product.model';
import { UserModel } from 'src/user/user.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ReviewsModel extends Base {}

export class ReviewsModel extends TimeStamps {
  @prop({ ref: () => UserModel })
  userId: Ref<UserModel>;

  @prop({ ref: () => ProductModel })
  productId: Ref<ProductModel>;
  @prop()
  store: string;
  @prop()
  name: string;
  @prop()
  text: string;
  @prop()
  response: string;
}
