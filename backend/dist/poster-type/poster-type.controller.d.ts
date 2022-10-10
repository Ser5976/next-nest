import { PosterTypeService } from './poster-type.service';
import { PosterTypeDto } from './dto/poster-type.dto';
export declare class PosterTypeController {
    private readonly PosterTypeService;
    constructor(PosterTypeService: PosterTypeService);
    createPoster(dto: PosterTypeDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./poster-type.model").PosterTypeModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPoster(typeId: string): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./poster-type.model").PosterTypeModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deletePicture(typeId: string): Promise<{
        message: string;
    }>;
}
