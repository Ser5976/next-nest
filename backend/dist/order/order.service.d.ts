import { ExecuteDto } from './dto/execute.dto';
import { OrderDto } from './dto/order.dto';
import { OrderModel } from './order.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { SearchDto } from './dto/search.dto';
export declare class OrderService {
    private readonly OrderModel;
    constructor(OrderModel: ModelType<OrderModel>);
    createOrder(dto: OrderDto, _id: string): Promise<DocumentType<OrderModel>>;
    getOrder(): Promise<{
        orders: DocumentType<OrderModel>[];
        quantity: number;
    }>;
    executeAnOrder(dto: ExecuteDto): Promise<{
        message: string;
    }>;
    findOrders(dto: SearchDto): Promise<DocumentType<OrderModel>[]>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
}
