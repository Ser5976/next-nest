/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { UserModel } from 'src/user/user.model';
import { ViewedService } from './viewed.service';
import { Types } from 'mongoose';
export declare class ViewedController {
    private readonly ViewedService;
    constructor(ViewedService: ViewedService);
    getViewed(_id: string): Promise<import("@typegoose/typegoose").Ref<import("../product/product.model").ProductModel, Types.ObjectId>[]>;
    setViewed(user: UserModel, productId: Types.ObjectId): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    }>;
}
