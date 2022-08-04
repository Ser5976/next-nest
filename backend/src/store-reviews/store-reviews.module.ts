import { StoreReviewsModel } from './store-reviews.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { StoreReviewsController } from './store-reviews.controller';
import { StoreReviewsService } from './store-reviews.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: StoreReviewsModel,
        schemaOptions: {
          collection: 'StoreReviews',
        },
      },
    ]),
  ],
  controllers: [StoreReviewsController],
  providers: [StoreReviewsService],
})
export class StoreReviewsModule {}
