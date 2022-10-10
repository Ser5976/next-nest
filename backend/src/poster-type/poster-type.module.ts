import { PosterTypeModel } from './poster-type.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PosterTypeController } from './poster-type.controller';
import { PosterTypeService } from './poster-type.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PosterTypeModel,
        schemaOptions: {
          collection: 'Poster',
        },
      },
    ]),
  ],
  controllers: [PosterTypeController],
  providers: [PosterTypeService],
})
export class PosterTypeModule {}
