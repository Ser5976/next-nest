/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
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
    getAllUsers(dto: SearchDto): Promise<{
        users: (import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & UserModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        quantity: number;
    }>;
    deleteUsers(id: string): Promise<{
        message: string;
    }>;
}
