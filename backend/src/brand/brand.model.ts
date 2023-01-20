import { prop} from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface BrandModel extends Base {}

export class BrandModel extends TimeStamps {
  
  @prop()
  name: string;

}