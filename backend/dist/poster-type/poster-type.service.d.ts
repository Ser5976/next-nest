import { UpdatePosterDto } from './dto/udatePoster.dto';
import { PosterTypeModel } from './poster-type.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { PosterTypeDto } from './dto/poster-type.dto';
export declare class PosterTypeService {
    private readonly PosterTypeModel;
    constructor(PosterTypeModel: ModelType<PosterTypeModel>);
    createPoster(dto: PosterTypeDto): Promise<DocumentType<PosterTypeModel>>;
    getPosters(): Promise<DocumentType<PosterTypeModel>[]>;
    getPoster(typeId: string): Promise<DocumentType<PosterTypeModel>>;
    updatePoster(dto: UpdatePosterDto): Promise<{
        message: string;
    }>;
    deletePoster(posterId: string): Promise<{
        message: string;
    }>;
}
