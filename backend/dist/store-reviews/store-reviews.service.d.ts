/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { ResponseDto } from './dto/response.dto';
import { StoreReviewsModel } from './store-reviews.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { StoreReviewsDto } from './dto/store-reviews.dto';
export declare class StoreReviewsService {
    private readonly StoreReviewsModel;
    constructor(StoreReviewsModel: ModelType<StoreReviewsModel>);
    createStoreReveiws(dto: StoreReviewsDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & StoreReviewsModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getStoreReviews(): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & StoreReviewsModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    responseReview(id: string, dto: ResponseDto): Promise<{
        message: string;
    }>;
    deleteNews(id: string): Promise<{
        message: string;
    }>;
}
