import { CartModel } from './../cart/cart.model';
import { ProductModel } from 'src/product/product.model';
import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
declare class Phone {
    phone: string;
}
declare class PersonalData {
    name: string;
    gender: string;
    birthday: string;
}
declare class Address {
    city: string;
    street: string;
    house: string;
    flat: string;
}
export interface UserModel extends Base {
}
export declare class UserModel extends TimeStamps {
    email: string;
    password: string;
    cart: Ref<CartModel>[];
    isAdmin?: boolean;
    favorites?: Ref<ProductModel>[];
    viewed?: Ref<ProductModel>[];
    phone: Phone;
    personalData: PersonalData;
    address: Address;
    purchaseHistory?: [];
}
export {};
