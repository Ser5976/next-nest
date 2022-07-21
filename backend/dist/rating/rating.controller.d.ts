import { RatingDto } from './dto/rating.dto';
import { RatingService } from './rating.service';
export declare class RatingController {
    private readonly RatingService;
    constructor(RatingService: RatingService);
    setRating(_id: string, dto: RatingDto): Promise<{
        message: string;
    }>;
}
