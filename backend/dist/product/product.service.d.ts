import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductTypeModel } from './../product-type/product-type.model';
import { ProductDto } from './dto/product.dto';
import { ProductModel } from './product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
export declare class ProductService {
    private readonly ProductModel;
    private readonly ProductTypeModel;
    private readonly CategoryProductModel;
    constructor(ProductModel: ModelType<ProductModel>, ProductTypeModel: ModelType<ProductTypeModel>, CategoryProductModel: ModelType<CategoryProductModel>);
    create(dto: ProductDto): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    }>;
    byIdProduct(id: string): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    }>;
    textSearch(text: string): Promise<(import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    })[]>;
    updateProduct(id: string, dto: ProductDto): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    }>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
}
