import { UserModel } from './../user/user.model';
import { CartModel } from './../cart/cart.model';
import { SearchDto } from './dto/search.dto';
import { QueryParametrsDto } from './dto/queryParametrs.dto';
import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductTypeModel } from './../product-type/product-type.model';
import { ProductDto } from './dto/product.dto';
import { ProductModel } from './product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { AdminSearchDto } from './dto/admin.search.dto';
export declare class ProductService {
    private readonly ProductModel;
    private readonly ProductTypeModel;
    private readonly CategoryProductModel;
    private readonly CartModel;
    private readonly UserModel;
    constructor(ProductModel: ModelType<ProductModel>, ProductTypeModel: ModelType<ProductTypeModel>, CategoryProductModel: ModelType<CategoryProductModel>, CartModel: ModelType<CartModel>, UserModel: ModelType<UserModel>);
    create(dto: ProductDto): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    }>;
    getProducts(dto?: AdminSearchDto): Promise<{
        products: (import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
            _id: Types.ObjectId;
        })[];
        quantity: number;
    }>;
    getFilteredProducts(dto: QueryParametrsDto): Promise<{
        filteredProducts: (import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
            _id: Types.ObjectId;
        })[];
        count: number;
        pageQty: number;
    }>;
    byIdProduct(id: string): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    }>;
    textSearch(dto: SearchDto): Promise<(import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    })[]>;
    getPopularProducts(): Promise<(import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    })[]>;
    getLatestProduct(): Promise<(import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    })[]>;
    updateProduct(id: string, dto: ProductDto): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ProductModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    }>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
}
