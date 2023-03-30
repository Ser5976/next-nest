/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { ProductModel } from 'src/product/product.model';
import { CategoryProductDto } from './dto/category-product.dto';
import { CategoryProductModel } from './category-product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { SearchDto } from './dto/search.dto';
export declare class CategoryProductService {
    private readonly CategoryProductModel;
    private readonly ProductModel;
    constructor(CategoryProductModel: ModelType<CategoryProductModel>, ProductModel: ModelType<ProductModel>);
    createCategoryProduct(dto: CategoryProductDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & CategoryProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCategoryProduct(dto: SearchDto): Promise<Omit<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & CategoryProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    removeCategoryProduct(id: string): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & CategoryProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
