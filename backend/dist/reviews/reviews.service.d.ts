import { UserModel } from './../user/user.model';
import { UpdateReviewDto } from './dto/update.review.dto';
import { ReviewsDto } from './dto/reviews.dto';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { ReviewsModel } from './reviews.model';
import { Types } from 'mongoose';
import { ResponseDto } from './dto/response.dto';
export declare class ReviewsService {
    private readonly ReviewsModel;
    private readonly UserModel;
    constructor(ReviewsModel: ModelType<ReviewsModel>, UserModel: ModelType<UserModel>);
    create(id: string, dto: ReviewsDto): Promise<import("mongoose").Document<Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & ReviewsModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: Types.ObjectId;
    }>;
    getUserReviews(id: string): Promise<DocumentType<ReviewsModel>[]>;
    getStoreReviews(): Promise<DocumentType<ReviewsModel>[]>;
    getProductReviews(productId: string): Promise<DocumentType<ReviewsModel>[]>;
    updateReview(idReview: string, dto: UpdateReviewDto): Promise<{
        message: string;
    }>;
    responseReview(id: string, dto: ResponseDto): Promise<{
        message: string;
    }>;
    deleteReview(id: string, _id: string): Promise<{
        message: string;
    }>;
}
