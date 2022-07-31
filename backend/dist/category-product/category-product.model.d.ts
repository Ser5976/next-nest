import { ProductTypeModel } from './../product-type/product-type.model';
import { BrandModel } from './../brand/brand.model';
import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface CategoryProductModel extends Base {
}
export declare class CategoryProductModel extends TimeStamps {
    name: string;
    productType: Ref<ProductTypeModel>[];
    brand: Ref<BrandModel>[];
}
