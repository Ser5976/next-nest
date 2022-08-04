import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface StoreReviewsModel extends Base {}

export class StoreReviewsModel extends TimeStamps {
  @prop()
  name: string;
  @prop()
  email: string;
  @prop()
  text: string;
  @prop()
  response: string;
}
