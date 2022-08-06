import { SliderModel } from './slider.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SliderController } from './slider.controller';
import { SliderService } from './slider.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: SliderModel,
        schemaOptions: {
          collection: 'Slider',
        },
      },
    ]),
  ],
  controllers: [SliderController],
  providers: [SliderService],
})
export class SliderModule {}
