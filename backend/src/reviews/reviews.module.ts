import { UserModel } from './../user/user.model';
import { ReviewsModel } from './reviews.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewsModel,
        schemaOptions: {
          collection: 'Reviews',
        },
      },
    ]),
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
