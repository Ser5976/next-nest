import { UserModel } from './../user/user.model';
import { UpdateReviewDto } from './dto/update.review.dto';
import { ReviewsDto } from './dto/reviews.dto';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { ReviewsModel } from './reviews.model';
export declare class ReviewsService {
    private readonly ReviewsModel;
    private readonly UserModel;
    constructor(ReviewsModel: ModelType<ReviewsModel>, UserModel: ModelType<UserModel>);
    create(id: string, dto: ReviewsDto): Promise<{
        message: string;
    }>;
    getUserReviews(id: string): Promise<DocumentType<ReviewsModel>[]>;
    getProductReviews(productId: string): Promise<DocumentType<ReviewsModel>[]>;
    updateReview(idReview: string, dto: UpdateReviewDto): Promise<{
        message: string;
    }>;
    deleteReview(userId: string, id: string): Promise<{
        message: string;
    }>;
}
