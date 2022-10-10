import { PosterTypeModel } from './poster-type.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { PosterTypeDto } from './dto/poster-type.dto';
export declare class PosterTypeService {
    private readonly PosterTypeModel;
    constructor(PosterTypeModel: ModelType<PosterTypeModel>);
    createPoster(dto: PosterTypeDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & PosterTypeModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPoster(typeId: string): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & PosterTypeModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deletePoster(typeId: string): Promise<{
        message: string;
    }>;
}
