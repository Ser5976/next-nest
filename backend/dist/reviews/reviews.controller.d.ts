/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { UpdateReviewDto } from './dto/update.review.dto';
import { ReviewsDto } from './dto/reviews.dto';
import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly ReviewsService;
    constructor(ReviewsService: ReviewsService);
    create(_id: string, dto: ReviewsDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./reviews.model").ReviewsModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
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
