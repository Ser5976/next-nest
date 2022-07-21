import { ProductModel } from './../product/product.model';
import { UserModel } from 'src/user/user.model';
import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface ReviewsModel extends Base {
}
export declare class ReviewsModel extends TimeStamps {
    userId: Ref<UserModel>;
    productId: Ref<ProductModel>;
    name: string;
    text: string;
}
