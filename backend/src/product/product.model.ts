import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductTypeModel } from './../product-type/product-type.model';
import { BrandModel } from './../brand/brand.model';
import { index, prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class Rating {
  @prop({ default: 0 })
  estimation: number;
  @prop({ default: 0 })
  numberRatings: number;
}
class Characteristic {
  @prop()
  title: string;
  @prop()
  property: string;
}

export interface ProductModel extends Base {}

@index({ '$**': 'text' }) //для поиска по тексту ,ищет везде
export class ProductModel extends TimeStamps {
  @prop()
  name: string;
  @prop()
  description: string;
  @prop({ type: () => Characteristic })
  characteristic: Characteristic[];
  @prop({ type: () => Rating, _id: false, default: {} })
  rating: Rating;
  @prop()
  price: number;
  @prop()
  oldPrice?: number;
  @prop(String)
  files: string[];
  @prop({ ref: () => BrandModel })
  brandId: Ref<BrandModel>;
  @prop({ ref: () => ProductTypeModel })
  typeId: Ref<ProductTypeModel>;
  @prop({ ref: () => CategoryProductModel })
  categoryId: Ref<CategoryProductModel>;
}
