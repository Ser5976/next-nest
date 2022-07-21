import { UpdateReviewDto } from './dto/update.review.dto';
import { ReviewsDto } from './dto/reviews.dto';
import { ReviewsService } from './reviews.service';
import { Types } from 'mongoose';
export declare class ReviewsController {
    private readonly ReviewsService;
    constructor(ReviewsService: ReviewsService);
    create(_id: Types.ObjectId, dto: ReviewsDto): Promise<{
        message: string;
    }>;
    getReviews(_id: string): Promise<import("@typegoose/typegoose").DocumentType<import("./reviews.model").ReviewsModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    getProductReviews(productId: string): Promise<import("@typegoose/typegoose").DocumentType<import("./reviews.model").ReviewsModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    updateReview(id: string, dto: UpdateReviewDto): Promise<{
        message: string;
    }>;
    deleteRrview(id: string): Promise<{
        message: string;
    }>;
}
