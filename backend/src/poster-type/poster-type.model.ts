import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ProductTypeModel } from 'src/product-type/product-type.model';

export interface PosterTypeModel extends Base {}

export class PosterTypeModel extends TimeStamps {
  @prop(String)
  picture: string;
  @prop({ ref: () => ProductTypeModel })
  typeId: Ref<ProductTypeModel>;
}
