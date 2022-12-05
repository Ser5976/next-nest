import { CartModel } from '../cart/cart.model';
import { UserModel } from '../user/user.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class Address {
  @prop({ required: true })
  city: string;
  @prop({ required: true })
  street: string;
  @prop({ required: true })
  house: string;
  @prop()
  flat: string;
}

export interface OrderModel extends Base {}

export class OrderModel extends TimeStamps {
  @prop({ ref: () => CartModel, required: true })
  productCart: Ref<CartModel>[];
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
  @prop({ required: true })
  telephone: string;
  @prop({ required: true })
  orderAmount: number;
}
