import { BrandModel } from './brand.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: BrandModel,
        schemaOptions: {
          collection: 'Brand',
        },
      },
    ])
  ],
  controllers: [BrandController],
  providers: [BrandService]
})
export class BrandModule {}
