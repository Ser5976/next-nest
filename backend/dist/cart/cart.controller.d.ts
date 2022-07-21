import { CartDto } from './dto/cart.dto';
import { CartService } from './cart.service';
export declare class CartController {
    private readonly CartService;
    constructor(CartService: CartService);
    addCart(_id: string, dto: CartDto): Promise<{
        message: string;
    }>;
    getCart(_id: string): Promise<{
        cart: (import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./cart.model").CartModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
        totalPriceProduct: number;
    }>;
    removingProductCart(id: string, _id: string): Promise<{
        message: string;
    }>;
    reduceNumber(id: string): Promise<{
        message: string;
    }>;
}
