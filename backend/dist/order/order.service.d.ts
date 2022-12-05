import { OrderDto } from './dto/order.dto';
import { OrderModel } from './order.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class OrderService {
    private readonly OrderModel;
    constructor(OrderModel: ModelType<OrderModel>);
    createOrder(dto: OrderDto, _id: string): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & OrderModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getOrder(): Promise<Omit<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & OrderModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
}
