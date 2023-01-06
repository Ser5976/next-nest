import { PosterTypeService } from './poster-type.service';
import { PosterTypeDto } from './dto/poster-type.dto';
import { UpdatePosterDto } from './dto/udatePoster.dto';
export declare class PosterTypeController {
    private readonly PosterTypeService;
    constructor(PosterTypeService: PosterTypeService);
    createPoster(dto: PosterTypeDto): Promise<import("@typegoose/typegoose").DocumentType<import("./poster-type.model").PosterTypeModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    getPosters(): Promise<import("@typegoose/typegoose").DocumentType<import("./poster-type.model").PosterTypeModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    getPoster(typeId: string): Promise<import("@typegoose/typegoose").DocumentType<import("./poster-type.model").PosterTypeModel, import("@typegoose/typegoose/lib/types").BeAnObject>>;
    updatePoster(dto: UpdatePosterDto): Promise<{
        message: string;
    }>;
    deletePicture(posterId: string): Promise<{
        message: string;
    }>;
}
