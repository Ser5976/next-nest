import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductModel } from 'src/product/product.model';
import { ProductTypeDto } from './dto/product-type.dto';
import { ProductTypeModel } from './product-type.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel(ProductTypeModel)
    private readonly ProductTypeModel: ModelType<ProductTypeModel>,
    @InjectModel(ProductModel)
    private readonly ProductModel: ModelType<ProductModel>,
    @InjectModel(CategoryProductModel)
    private readonly CategoryProductModel: ModelType<CategoryProductModel>,
  ) {}
  //создание типа товара
  async createProductType(dto: ProductTypeDto) {
    const productType = await this.ProductTypeModel.create(dto);
    if (!productType) throw new NotFoundException('Тип продукта не создан');
    return productType;
  }
  // получение типов товаров
  async getProductType() {
    const productsTypes = await this.ProductTypeModel.find()
      .populate('brand')
      .exec();
    if (!productsTypes) throw new NotFoundException('Типы не получены');
    return productsTypes;
  }

  // удаление типа товара
  async removeProductType(id: string) {
    //делаем запрос на товары, если товар с таким типом существует, то не удаляем
    const product = await this.ProductModel.findOne({ typeId: id });
    if (product) return { message: 'Тип не удалён,использутся в товарах' };
    // удаляем тип из категории
    const category = await this.CategoryProductModel.updateMany(
      {},
      { $pull: { productType: id } },
    );
    //удаление типа
    const removeProductType = await this.ProductTypeModel.findByIdAndDelete(
      id,
    ).exec();
    if (!removeProductType)
      throw new NotFoundException('Тип продукта не удалён');
    return { message: 'Тип продукта удален' };
  }
}
