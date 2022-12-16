import { SearchDto } from './dto/search.dto';
import { UpdateReviewDto } from './dto/update.review.dto';
import { ReviewsDto } from './dto/reviews.dto';
import { ReviewsService } from './reviews.service';
import { ResponseDto } from './dto/response.dto';
export declare class ReviewsController {
    private readonly ReviewsService;
    constructor(ReviewsService: ReviewsService);
    create(_id: string, dto: ReviewsDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./reviews.model").ReviewsModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getReviews(_id: string): Promise<import("@typegoose/typegoose").DocumentType<import("./reviews.model").ReviewsModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    getStoreReviews(): Promise<import("@typegoose/typegoose").DocumentType<import("./reviews.model").ReviewsModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    getAllReviews(): Promise<import("@typegoose/typegoose").DocumentType<import("./reviews.model").ReviewsModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    findReviews(dto: SearchDto): Promise<import("@typegoose/typegoose").DocumentType<import("./reviews.model").ReviewsModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    getProductReviews(productId: string): Promise<import("@typegoose/typegoose").DocumentType<import("./reviews.model").ReviewsModel, import("@typegoose/typegoose/lib/types").BeAnObject>[]>;
    updateReview(id: string, dto: UpdateReviewDto): Promise<{
        message: string;
    }>;
    responseReviews(id: string, dto: ResponseDto): Promise<{
        message: string;
    }>;
    deleteRrview(id: string, _id: string): Promise<{
        message: string;
    }>;
}
