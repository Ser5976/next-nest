import { BrandModel } from './../brand/brand.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ProductTypeModel extends Base {}

export class ProductTypeModel extends TimeStamps {
  @prop()
  name: string;
  @prop({ ref: () => BrandModel })
  brand: Ref<BrandModel>[];
}
