/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductModel } from 'src/product/product.model';
import { ProductTypeDto } from './dto/product-type.dto';
import { ProductTypeModel } from './product-type.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class ProductTypeService {
    private readonly ProductTypeModel;
    private readonly ProductModel;
    private readonly CategoryProductModel;
    constructor(ProductTypeModel: ModelType<ProductTypeModel>, ProductModel: ModelType<ProductModel>, CategoryProductModel: ModelType<CategoryProductModel>);
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
