import { ProductTypeDto } from './dto/product-type.dto';
import { ProductTypeModel } from './product-type.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class ProductTypeService {
    private readonly ProductTypeModel;
    constructor(ProductTypeModel: ModelType<ProductTypeModel>);
    createProductType(dto: ProductTypeDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductTypeModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getProductType(): Promise<Omit<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductTypeModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    removeProductType(id: string): Promise<{
        message: string;
    }>;
}
