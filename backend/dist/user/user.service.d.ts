import { UserModel } from './user.model';
import { UpdateEmailDto } from './dto/update.email.dto';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { SearchDto } from './dto/search.dto';
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
    findUser(dto: SearchDto): Promise<DocumentType<UserModel>[]>;
    getAllUsers(): Promise<{
        users: DocumentType<UserModel>[];
        quantity: number;
    }>;
    deleteUsers(id: string): Promise<{
        message: string;
    }>;
}
