import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface NewsModel extends Base {}

export class NewsModel extends TimeStamps {
  @prop()
  name: string;
  @prop()
  text: string;
}
