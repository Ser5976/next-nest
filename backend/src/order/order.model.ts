import { ProductModel } from 'src/product/product.model';
import { UserModel } from './../user/user.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class Address {
  @prop({ required: true })
  city: string;
  @prop({ required: true })
  street: string;
  @prop({ required: true })
  house: string;
  @prop({ required: true })
  flat: string;
}

export interface OrderModel extends Base {}

export class OrderModel extends TimeStamps {
  @prop({ ref: () => ProductModel })
  product: Ref<ProductModel>;
  @prop({ ref: () => UserModel })
  user: Ref<UserModel>;
  @prop({ required: true })
  name: string;
  @prop({ required: true })
  email: string;
  @prop({ type: () => Address, _id: false, required: true })
  address: Address;
  @prop({ required: true })
  delivery: string;
  @prop({ required: true })
  payment: string;
  @prop()
  telephone: string;
}
