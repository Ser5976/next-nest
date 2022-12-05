import { CartModel } from '../cart/cart.model';
import { UserModel } from '../user/user.model';
import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
declare class Address {
    city: string;
    street: string;
    house: string;
    flat: string;
}
export interface OrderModel extends Base {
}
export declare class OrderModel extends TimeStamps {
    productCart: Ref<CartModel>[];
    user: Ref<UserModel>;
    name: string;
    email: string;
    address: Address;
    delivery: string;
    payment: string;
    telephone: string;
    orderAmount: number;
}
export {};
