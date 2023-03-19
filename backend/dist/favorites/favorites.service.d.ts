import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';
import { Types } from 'mongoose';
export declare class FavoritesService {
    private readonly UserModel;
    constructor(UserModel: ModelType<UserModel>);
    setFavorites(user: UserModel, productId: string): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    }>;
}
