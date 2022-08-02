import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly ProductServies;
    constructor(ProductServies: ProductService);
    create(dto: ProductDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    get(id: string): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    textSearch(text: string): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updateProduct(id: string, dto: ProductDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    DeleteProduct(id: string): Promise<{
        message: string;
    }>;
}
