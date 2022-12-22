import { SearchDto } from './../user/dto/search.dto';
import { ExecuteDto } from './dto/execute.dto';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly OrderService;
    constructor(OrderService: OrderService);
    createOrder(_id: string, dto: OrderDto): Promise<import("@typegoose/typegoose").DocumentType<import("./order.model").OrderModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    getOrder(): Promise<{
        orders: import("@typegoose/typegoose").DocumentType<import("./order.model").OrderModel, import("@typegoose/typegoose/lib/types").BeAnObject>[];
        quantity: number;
    }>;
    executeAnOrder(dto: ExecuteDto): Promise<{
        message: string;
    }>;
    findReviews(dto: SearchDto): Promise<import("@typegoose/typegoose").DocumentType<import("./order.model").OrderModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
}
