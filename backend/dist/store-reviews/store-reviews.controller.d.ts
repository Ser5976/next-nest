import { ResponseDto } from './dto/response.dto';
import { StoreReviewsDto } from './dto/store-reviews.dto';
import { StoreReviewsService } from './store-reviews.service';
export declare class StoreReviewsController {
    private readonly StoreReviewsService;
    constructor(StoreReviewsService: StoreReviewsService);
    createNews(dto: StoreReviewsDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./store-reviews.model").StoreReviewsModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllNews(): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./store-reviews.model").StoreReviewsModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    responseReviews(id: string, dto: ResponseDto): Promise<{
        message: string;
    }>;
    deleteNews(id: string): Promise<{
        message: string;
    }>;
}
