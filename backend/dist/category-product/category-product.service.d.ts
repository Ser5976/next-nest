import { CategoryProductDto } from './dto/category-product.dto';
import { CategoryProductModel } from './category-product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class CategoryProductService {
    private readonly CategoryProductModel;
    constructor(CategoryProductModel: ModelType<CategoryProductModel>);
    createCategoryProduct(dto: CategoryProductDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & CategoryProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCategoryProduct(): Promise<Omit<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & CategoryProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    removeProductType(id: string): Promise<{
        message: string;
    }>;
}
