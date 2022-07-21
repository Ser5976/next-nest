import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
declare class Rating {
    estimation: number;
    numberRatings: number;
}
export interface ProductModel extends Base {
}
export declare class ProductModel extends TimeStamps {
    name: string;
    rating: Rating;
    price: number;
    oldPrice?: number;
}
export {};
