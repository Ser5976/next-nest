import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductTypeModel } from './../product-type/product-type.model';
import { ProductModel } from 'src/product/product.model';
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
    ]),
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          collection: 'Product',
        },
      },
    ]),
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductTypeModel,
        schemaOptions: {
          collection: 'ProductType',
        },
      },
    ]),
    TypegooseModule.forFeature([
      {
        typegooseClass: CategoryProductModel,
        schemaOptions: {
          collection: 'CatecoryProduct',
        },
      },
    ]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
