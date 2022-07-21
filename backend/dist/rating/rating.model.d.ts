import { ProductModel } from './../product/product.model';
import { UserModel } from 'src/user/user.model';
import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface RatingModel extends Base {
}
export declare class RatingModel extends TimeStamps {
    userId: Ref<UserModel>;
    productId: Ref<ProductModel>;
    value: number;
}
