import { BrandModel } from './../brand/brand.model';
import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface ProductTypeModel extends Base {
}
export declare class ProductTypeModel extends TimeStamps {
    name: string;
    brand: Ref<BrandModel>;
}
