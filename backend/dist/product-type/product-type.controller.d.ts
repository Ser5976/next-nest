import { ProductTypeDto } from './dto/product-type.dto';
import { ProductTypeService } from './product-type.service';
export declare class ProductTypeController {
    private readonly ProductTypeService;
    constructor(ProductTypeService: ProductTypeService);
    createProductType(dto: ProductTypeDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product-type.model").ProductTypeModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getProductType(): Promise<Omit<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product-type.model").ProductTypeModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    removeProductType(id: string): Promise<{
        message: string;
    }>;
}
