import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ProductTypeModel } from 'src/product-type/product-type.model';

export interface SliderModel extends Base {}

export class SliderModel extends TimeStamps {
  @prop(String)
  picture: string;
  @prop({ ref: () => ProductTypeModel })
  typeId: Ref<ProductTypeModel>;
  @prop(String)
  text: string;
}
