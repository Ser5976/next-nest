import { UserModel } from 'src/user/user.model';
import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly FavoritesService;
    constructor(FavoritesService: FavoritesService);
    setFavorites(user: UserModel, productId: string): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
