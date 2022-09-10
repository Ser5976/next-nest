import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ForCustomersModel extends Base {}

export class ForCustomersModel extends TimeStamps {
  @prop()
  title: string;
  @prop()
  description: string;
  @prop({ unique: true })
  slug: string;
}
