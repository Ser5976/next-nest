import { ProductTypeModel } from './product-type.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductTypeModel,
        schemaOptions: {
          collection: 'ProductType',
        },
      },
    ]),
  ],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
})
export class ProductTypeModule {}
