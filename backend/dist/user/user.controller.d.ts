import { UpdateDto } from './dto/update.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly UserServies;
    constructor(UserServies: UserService);
    getProfile(_id: string): Promise<import("@typegoose/typegoose").DocumentType<import("./user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    updateProfileUser(_id: any, updateDto: UpdateDto): Promise<{
        message: string;
    }>;
    getAllusers(searchUser?: string): Promise<import("@typegoose/typegoose").DocumentType<import("./user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    getUser(id: string): Promise<import("@typegoose/typegoose").DocumentType<import("./user.model").UserModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    quantityUsers(): Promise<number>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
