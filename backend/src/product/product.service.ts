import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductTypeModel } from './../product-type/product-type.model';
import { ProductDto } from './dto/product.dto';
import { FileService } from './../file/file.service';
import { ProductModel } from './product.model';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly ProductModel: ModelType<ProductModel>,
    @InjectModel(ProductTypeModel)
    private readonly ProductTypeModel: ModelType<ProductTypeModel>,
    @InjectModel(CategoryProductModel)
    private readonly CategoryProductModel: ModelType<CategoryProductModel>,
  ) {}
  //создание товара
  async create(dto: ProductDto) {
    //добавление брэнда в тип товара
    // получаем тип товара
    const typeProduct: ProductTypeModel = await this.ProductTypeModel.findById(
      dto.typeId,
    );
    // проверяем есть ли в массиве brand такой брэнд
    const checkBrand = typeProduct.brand.includes(
      new Types.ObjectId(dto.brandId),
    );
    //если нету добавляем
    if (!checkBrand) {
      await this.ProductTypeModel.updateOne(
        { _id: dto.typeId },
        {
          $push: { brand: dto.brandId },
        },
      );
    }
    //добавление типа товара и брэнда в категорию товара
    // получаем категорию товара
    const categoryProduct: CategoryProductModel =
      await this.CategoryProductModel.findById(dto.categoryId);
    // проверяем есть ли в массиве productType такой тип
    const checkType = categoryProduct.productType.includes(
      new Types.ObjectId(dto.typeId),
    );
    //если нету добавляем
    if (!checkType) {
      await this.CategoryProductModel.updateOne(
        { _id: dto.categoryId },
        {
          $push: { productType: dto.typeId },
        },
      );
    }
    // проверяем есть ли в массиве brand такой брэнд
    const checkBrandCategory = categoryProduct.brand.includes(
      new Types.ObjectId(dto.brandId),
    );
    //если нету добавляем
    if (!checkBrandCategory) {
      await this.CategoryProductModel.updateOne(
        { _id: dto.categoryId },
        {
          $push: { brand: dto.brandId },
        },
      );
    }
    const product = await this.ProductModel.create(dto);
    if (!product) throw new NotFoundException('Товар не создан');
    return product;
  }
  //получение товара
  async byIdProduct(id: string) {
    const product = await this.ProductModel.findById(id).exec();
    if (!product) throw new NotFoundException('Такого товара не существует!');
    return product;
  }

  // обнавление товара
  async updateProduct(id: string, dto: ProductDto) {
    const newProduct = await this.ProductModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec();
    if (!newProduct) throw new NotFoundException('Обнавление не произошло');
    return newProduct;
  }
  // удаление товара
  async deleteProduct(id: string) {
    const deleteProduct = await this.ProductModel.findByIdAndDelete(id).exec();
    if (!deleteProduct)
      throw new NotFoundException('Такого пользователя не существует');
    return { message: 'Пользователь удалён' };
  }
}
