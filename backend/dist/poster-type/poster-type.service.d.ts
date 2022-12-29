import { UpdatePosterDto } from './dto/udatePoster.dto';
import { PosterTypeModel } from './poster-type.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { PosterTypeDto } from './dto/poster-type.dto';
export declare class PosterTypeService {
    private readonly PosterTypeModel;
    constructor(PosterTypeModel: ModelType<PosterTypeModel>);
    createPoster(dto: PosterTypeDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & PosterTypeModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPosters(): Promise<Omit<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & PosterTypeModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getPoster(typeId: string): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & PosterTypeModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updatePoster(dto: UpdatePosterDto): Promise<import("mongodb").UpdateResult>;
    deletePoster(typeId: string): Promise<{
        message: string;
    }>;
}
