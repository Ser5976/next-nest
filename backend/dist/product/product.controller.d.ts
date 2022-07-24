import { ProductService } from './product.service';
export declare class ProductController {
    private readonly ProductServies;
    constructor(ProductServies: ProductService);
    create(dto: {
        name: string;
    }): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
