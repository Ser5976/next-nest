import { ProductModel } from 'src/product/product.model';
import { CategoryProductDto } from './dto/category-product.dto';
import { CategoryProductModel } from './category-product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class CategoryProductService {
    private readonly CategoryProductModel;
    private readonly ProductModel;
    constructor(CategoryProductModel: ModelType<CategoryProductModel>, ProductModel: ModelType<ProductModel>);
    createCategoryProduct(dto: CategoryProductDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & CategoryProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCategoryProduct(): Promise<Omit<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & CategoryProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    removeCategoryProduct(id: string): Promise<{
        message: string;
    }>;
}
