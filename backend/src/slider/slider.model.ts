import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface SliderModel extends Base {}

export class SliderModel extends TimeStamps {
  @prop(String)
  picture: string;
}
