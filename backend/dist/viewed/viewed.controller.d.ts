import { UserModel } from 'src/user/user.model';
import { ViewedService } from './viewed.service';
export declare class ViewedController {
    private readonly ViewedService;
    constructor(ViewedService: ViewedService);
    setViewed(user: UserModel, productId: string): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
