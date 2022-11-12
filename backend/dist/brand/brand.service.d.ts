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
import { ProductTypeModel } from './../product-type/product-type.model';
import { ProductModel } from 'src/product/product.model';
import { UpdateLogoDto } from './dto/updatelogo.dto';
import { BrandDto } from './dto/brand.dto';
import { BrandModel } from './brand.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class BrandService {
    private readonly BrandModel;
    private readonly ProductModel;
    private readonly ProductTypeModel;
    private readonly CategoryProductModel;
    constructor(BrandModel: ModelType<BrandModel>, ProductModel: ModelType<ProductModel>, ProductTypeModel: ModelType<ProductTypeModel>, CategoryProductModel: ModelType<CategoryProductModel>);
    createBrand(dto: BrandDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & BrandModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getBrands(searchBrand?: string): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & BrandModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updateBarnd(id: string, dto: UpdateLogoDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & BrandModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    removeBrand(id: string): Promise<{
        message: string;
    }>;
}
