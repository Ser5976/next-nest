import { ReviewsModel } from './../reviews/reviews.model';
import { CartModel } from './../cart/cart.model';
import { ProductModel } from 'src/product/product.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class Phone {
  @prop({ default: '' })
  phone: string;
}
class PersonalData {
  @prop({ default: '' })
  name: string;
  @prop({ default: '' })
  gender: string;
  @prop({ default: '' })
  birthday: string;
}
class Address {
  @prop({ default: '' })
  city: string;
  @prop({ default: '' })
  street: string;
  @prop({ default: '' })
  house: string;
  @prop({ default: '' })
  flat: string;
}
export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop()
  password: string;

  @prop({ default: [], ref: () => CartModel })
  cart: Ref<CartModel>[];

  @prop({ default: [], ref: () => ReviewsModel })
  reviews: Ref<ReviewsModel>[];

  @prop({ default: false })
  isAdmin?: boolean;

  @prop({ default: [], ref: () => ProductModel }) //ссылка на другую сущность(ProductModel)
  favorites?: Ref<ProductModel>[];

  @prop({ default: [], ref: () => ProductModel })
  viewed?: Ref<ProductModel>[];

  @prop({ type: () => Phone, _id: false, default: {} })
  phone: Phone;

  @prop({ type: () => PersonalData, _id: false, default: {} })
  personalData: PersonalData;

  @prop({ type: () => Address, _id: false, default: {} })
  address: Address;

  @prop({ default: [] })
  purchaseHistory?: [];
}
