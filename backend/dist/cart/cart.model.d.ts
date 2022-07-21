import { ProductModel } from 'src/product/product.model';
import { UserModel } from 'src/user/user.model';
import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface CartModel extends Base {
}
export declare class CartModel extends TimeStamps {
    userId: Ref<UserModel>;
    productId: Ref<ProductModel>;
    name: string;
    price: number;
    picture: string;
    oldPrice?: number;
    totalPrice: number;
    totalOldPrice: number;
    quantity: number;
}
