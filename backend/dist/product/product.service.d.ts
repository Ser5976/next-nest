import { ProductModel } from './product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class ProductService {
    private readonly ProductModel;
    constructor(ProductModel: ModelType<ProductModel>);
    create(dto: {
        name: string;
    }): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
