import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductTypeModel } from './../product-type/product-type.model';
import { BrandModel } from './../brand/brand.model';
import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
declare class Rating {
    estimation: number;
    numberRatings: number;
}
declare class Characteristic {
    title: string;
    property: string;
}
export interface ProductModel extends Base {
}
export declare class ProductModel extends TimeStamps {
    name: string;
    description: string;
    characteristic: Characteristic[];
    rating: Rating;
    price: number;
    oldPrice?: number;
    files: string[];
    brandId: Ref<BrandModel>;
    typeId: Ref<ProductTypeModel>;
    categoryId: Ref<CategoryProductModel>;
}
export {};
