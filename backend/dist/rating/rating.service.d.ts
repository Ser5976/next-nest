import { ProductModel } from 'src/product/product.model';
import { RatingDto } from './dto/rating.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RatingModel } from './rating.model';
export declare class RatingService {
    private readonly RatingModel;
    private readonly ProductModel;
    constructor(RatingModel: ModelType<RatingModel>, ProductModel: ModelType<ProductModel>);
    setRating(userId: string, dto: RatingDto): Promise<{
        message: string;
    }>;
}
