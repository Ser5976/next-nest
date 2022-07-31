import { ProductTypeModel } from './../product-type/product-type.model';
import { BrandModel } from './../brand/brand.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface CategoryProductModel extends Base {}

export class CategoryProductModel extends TimeStamps {
  @prop()
  name: string;
  @prop({ ref: () => ProductTypeModel })
  productType: Ref<ProductTypeModel>[];
  @prop({ ref: () => BrandModel })
  brand: Ref<BrandModel>[];
}
