import { UpdatePasswordDto } from './dto/update.password.dto';
import { UpdateEmailDto } from './dto/update.email.dto';
import { UserService } from './user.service';
import { SearchDto } from './dto/search.dto';
export declare class UserController {
    private readonly UserServies;
    constructor(UserServies: UserService);
    getProfile(_id: string): Promise<import("@typegoose/typegoose").DocumentType<import("./user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    updateProfileUser(_id: any, updateEmailDto: UpdateEmailDto): Promise<{
        message: string;
    }>;
    updatePassoword(_id: any, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    getAllusers(): Promise<{
        users: (import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./user.model").UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        quantity: number;
    }>;
    findUser(dto: SearchDto): Promise<import("@typegoose/typegoose").DocumentType<import("./user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
