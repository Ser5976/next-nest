/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { UserModel } from 'src/user/user.model';
import { FavoritesService } from './favorites.service';
import { Types } from 'mongoose';
export declare class FavoritesController {
    private readonly FavoritesService;
    constructor(FavoritesService: FavoritesService);
    getFavorites(_id: string): Promise<import("@typegoose/typegoose").Ref<import("../product/product.model").ProductModel, Types.ObjectId>[]>;
    setFavorites(user: UserModel, productId: Types.ObjectId): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    }>;
}
