import { CategoryProductDto } from './dto/category-product.dto';
import { CategoryProductService } from './category-product.service';
import { SearchDto } from './dto/search.dto';
export declare class CategoryProductController {
    private readonly CategoryProductService;
    constructor(CategoryProductService: CategoryProductService);
    createProductType(dto: CategoryProductDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./category-product.model").CategoryProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCategoryProduct(dto: SearchDto): Promise<Omit<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./category-product.model").CategoryProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    removeCategoryProduct(id: string): Promise<{
        message: string;
    }>;
}
