import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductTypeModel } from './../product-type/product-type.model';
import { BrandModel } from './../brand/brand.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class Rating {
  @prop({ default: 0 })
  estimation: number;
  @prop({ default: 0 })
  numberRatings: number;
}

export interface ProductModel extends Base {}

export class ProductModel extends TimeStamps {
  @prop()
  name: string;
  @prop({ type: () => Rating, _id: false, default: {} })
  rating: Rating;
  @prop()
  price: number;
  @prop()
  oldPrice?: number;
  @prop([String])
  files: string[];
  @prop({ ref: () => BrandModel })
  brandId: Ref<BrandModel>;
  @prop({ ref: () => ProductTypeModel })
  typeId: Ref<ProductTypeModel>;
  @prop({ ref: () => CategoryProductModel })
  categoryId: Ref<CategoryProductModel>;
}
