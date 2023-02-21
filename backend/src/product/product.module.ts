import { UserModel } from './../user/user.model';
import { CartModel } from './../cart/cart.model';
import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductTypeModel } from './../product-type/product-type.model';
import { ProductModel } from './product.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
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
    TypegooseModule.forFeature([
      {
        typegooseClass: CartModel,
        schemaOptions: {
          collection: 'Cart',
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
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
