import { UpdateDto } from './dto/update.dto';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';
export declare class UserService {
    private readonly UserModel;
    constructor(UserModel: ModelType<UserModel>);
    byId(id: string): Promise<DocumentType<UserModel>>;
    updateProfileUser(_id: string, updateDto: UpdateDto): Promise<{
        message: string;
    }>;
    getAllUsers(searchUser?: string): Promise<DocumentType<UserModel>[]>;
    quantityUsers(): Promise<number>;
    deleteUsers(id: string): Promise<{
        message: string;
    }>;
}
