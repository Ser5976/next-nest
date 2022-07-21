import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class Rating {
  @prop({ default: 0 })
  estimation: number;
  @prop({ default: 0 })
  numberRatings: number;
}

export interface ProductModel extends Base {}

export class ProductModel extends TimeStamps {
  @prop()
  name: string;
  @prop({ type: () => Rating, _id: false, default: {} })
  rating: Rating;
  @prop()
  price: number;
  @prop()
  oldPrice?: number;
}
