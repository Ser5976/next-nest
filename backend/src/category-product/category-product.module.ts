import { ProductModel } from 'src/product/product.model';
import { BrandModel } from './../brand/brand.model';
import { ProductTypeModel } from './../product-type/product-type.model';
import { CategoryProductModel } from './category-product.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CategoryProductController } from './category-product.controller';
import { CategoryProductService } from './category-product.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CategoryProductModel,
        schemaOptions: {
          collection: 'CatecoryProduct',
        },
      },
    ]),
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          collection: 'Product',
        },
      },
    ]),
  ],
  controllers: [CategoryProductController],
  providers: [CategoryProductService],
})
export class CategoryProductModule {}
