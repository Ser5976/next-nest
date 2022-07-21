import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface ProductModel extends Base {
}
export declare class ProductModel extends TimeStamps {
    name: string;
}
