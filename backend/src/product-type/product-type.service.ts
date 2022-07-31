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
    //написать,когда будут продукты: делать проверку о наличии товаров с таким типом и только потом удальть,удалить тип из категории
    const removeProductType = await this.ProductTypeModel.findByIdAndDelete(
      id,
    ).exec();
    if (!removeProductType)
      throw new NotFoundException('Тип продукта не удалён');
    return { message: 'Тип продукта удален' };
  }
}
