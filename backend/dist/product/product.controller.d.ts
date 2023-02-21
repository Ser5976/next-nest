import { SearchDto } from './dto/search.dto';
import { QueryParametrsDto } from './dto/queryParametrs.dto';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { AdminSearchDto } from './dto/admin.search.dto';
export declare class ProductController {
    private readonly ProductServies;
    constructor(ProductServies: ProductService);
    create(dto: ProductDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getProducts(dto?: AdminSearchDto): Promise<{
        products: (import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        quantity: number;
    }>;
    getFilteredProducts(dto: QueryParametrsDto): Promise<{
        filteredProducts: (import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
        pageQty: number;
    }>;
    getPopularProducts(): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getLatestProduct(): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    textSearch(dto: SearchDto): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    get(id: string): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateProduct(id: string, dto: ProductDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./product.model").ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    DeleteProduct(id: string): Promise<{
        message: string;
    }>;
}
