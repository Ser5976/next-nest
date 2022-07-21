import { CartDto } from './dto/cart.dto';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CartModel } from './cart.model';
import { Types } from 'mongoose';
export declare class CartService {
    private readonly CartModel;
    private readonly UserModel;
    constructor(CartModel: ModelType<CartModel>, UserModel: ModelType<UserModel>);
    addCart(userId: string, dto: CartDto): Promise<{
        message: string;
    }>;
    getCart(userId: string): Promise<{
        cart: (import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & CartModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
            _id: Types.ObjectId;
        })[];
        count: number;
        totalPriceProduct: number;
    }>;
    removingProductCart(id: string, userId: string): Promise<{
        message: string;
    }>;
    reduceNumber(id: string): Promise<{
        message: string;
    }>;
}
