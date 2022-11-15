import { UpdatePasswordDto } from './dto/update.password.dto';
import { UpdateEmailDto } from './dto/update.email.dto';
import { UserService } from './user.service';
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
    getAllusers(searchUser?: string): Promise<import("@typegoose/typegoose").DocumentType<import("./user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    getUser(id: string): Promise<import("@typegoose/typegoose").DocumentType<import("./user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    quantityUsers(): Promise<number>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
