/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { UserModel } from './../user/user.model';
import { UpdateReviewDto } from './dto/update.review.dto';
import { ReviewsDto } from './dto/reviews.dto';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { ReviewsModel } from './reviews.model';
import { Types } from 'mongoose';
import { ResponseDto } from './dto/response.dto';
import { SearchDto } from './dto/search.dto';
export declare class ReviewsService {
    private readonly ReviewsModel;
    private readonly UserModel;
    constructor(ReviewsModel: ModelType<ReviewsModel>, UserModel: ModelType<UserModel>);
    create(id: string, dto: ReviewsDto): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, ReviewsModel> & ReviewsModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & Required<{
        _id: Types.ObjectId;
    }>>;
    getUserReviews(id: string): Promise<DocumentType<ReviewsModel>[]>;
    getStoreReviews(): Promise<DocumentType<ReviewsModel>[]>;
    getProductReviews(productId: string): Promise<DocumentType<ReviewsModel>[]>;
    updateReview(idReview: string, dto: UpdateReviewDto): Promise<{
        message: string;
    }>;
    getAllReviews(dto: SearchDto): Promise<{
        allReviews: DocumentType<ReviewsModel>[];
        quantity: number;
    }>;
    responseReview(id: string, dto: ResponseDto): Promise<{
        message: string;
    }>;
    deleteReview(id: string): Promise<{
        message: string;
    }>;
}
