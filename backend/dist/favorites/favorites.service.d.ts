import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';
import { Types } from 'mongoose';
export declare class FavoritesService {
    private readonly UserModel;
    constructor(UserModel: ModelType<UserModel>);
    getFavorites(id: string): Promise<import("@typegoose/typegoose/lib/types").Ref<import("../product/product.model").ProductModel, Types.ObjectId>[]>;
    setFavorites(user: UserModel, productId: Types.ObjectId): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    }>;
}
