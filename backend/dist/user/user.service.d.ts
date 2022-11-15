import { UpdateEmailDto } from './dto/update.email.dto';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from 'src/user/user.model';
import { UpdatePasswordDto } from './dto/update.password.dto';
export declare class UserService {
    private readonly UserModel;
    constructor(UserModel: ModelType<UserModel>);
    byId(id: string): Promise<DocumentType<UserModel>>;
    updateEmail(_id: string, updateEmailDto: UpdateEmailDto): Promise<{
        message: string;
    }>;
    updatePassoword(_id: string, updatePasswordDto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
    getAllUsers(searchUser?: string): Promise<DocumentType<UserModel>[]>;
    quantityUsers(): Promise<number>;
    deleteUsers(id: string): Promise<{
        message: string;
    }>;
}
