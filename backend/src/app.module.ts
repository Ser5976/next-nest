import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoDbConfig } from './config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PersonalDataModule } from './personal-data/personal-data.module';
import { ProductModule } from './product/product.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ViewedModule } from './viewed/viewed.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RatingModule } from './rating/rating.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig,
    }),
    AuthModule,
    UserModule,
    PersonalDataModule,
    ProductModule,
    FavoritesModule,
    ViewedModule,
    ReviewsModule,
    RatingModule,
    CartModule,
  ],
})
export class AppModule {}
