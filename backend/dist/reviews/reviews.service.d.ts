import { UpdateReviewDto } from './dto/update.review.dto';
import { ReviewsDto } from './dto/reviews.dto';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { ReviewsModel } from './reviews.model';
import { Types } from 'mongoose';
export declare class ReviewsService {
    private readonly ReviewsModel;
    constructor(ReviewsModel: ModelType<ReviewsModel>);
    create(id: Types.ObjectId, dto: ReviewsDto): Promise<{
        message: string;
    }>;
    getUserReviews(id: string): Promise<DocumentType<ReviewsModel>[]>;
    getProductReviews(productId: string): Promise<DocumentType<ReviewsModel>[]>;
    updateReview(idReview: string, dto: UpdateReviewDto): Promise<{
        message: string;
    }>;
    deleteReview(id: string): Promise<{
        message: string;
    }>;
}
