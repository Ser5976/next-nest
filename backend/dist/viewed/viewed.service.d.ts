import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
export declare class ViewedService {
    private readonly UserModel;
    constructor(UserModel: ModelType<UserModel>);
    getViewed(id: string): Promise<import("@typegoose/typegoose/lib/types").Ref<import("../product/product.model").ProductModel, Types.ObjectId>[]>;
    setViewed(user: UserModel, productId: string): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    }>;
}
