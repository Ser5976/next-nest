import { NewsModel } from './news.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: NewsModel,
        schemaOptions: {
          collection: 'News',
        },
      },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
