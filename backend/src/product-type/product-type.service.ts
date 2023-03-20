import { PosterTypeModel } from './../poster-type/poster-type.model';
import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductModel } from 'src/product/product.model';
import { ProductTypeDto } from './dto/product-type.dto';
import { ProductTypeModel } from './product-type.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel(ProductTypeModel)
    private readonly ProductTypeModel: ModelType<ProductTypeModel>,
    @InjectModel(ProductModel)
    private readonly ProductModel: ModelType<ProductModel>,
    @InjectModel(CategoryProductModel)
    private readonly CategoryProductModel: ModelType<CategoryProductModel>,
    @InjectModel(PosterTypeModel)
    private readonly PosterTypeModel: ModelType<PosterTypeModel>,
  ) {}
  //создание типа товара
  async createProductType(dto: ProductTypeDto) {
    const candidate = await this.ProductTypeModel.findOne({ name: dto.name });
    if (candidate) throw new BadRequestException('Такой тип уже существует');
    const productType = await this.ProductTypeModel.create(dto);
    if (!productType) throw new NotFoundException('Тип продукта не создан');
    return productType;
  }
  // получение(и поиск) типов товаров
  async getProductType(dto?: SearchDto) {
    let options = {};
    if (dto.name) {
      options = {
        $or: [
          {
            name: new RegExp(dto.name, 'i'),
          },
        ],
      };
    }
    const productsTypes = await this.ProductTypeModel.find(options)
      .populate('brand')
      .exec();
    if (!productsTypes) throw new NotFoundException('Типы не получены');
    return productsTypes;
  }

  //получение получение выбранного типа
  async byIdType(id: string) {
    const type = await this.ProductTypeModel.findById(id)
      .populate('brand')
      .exec();
    if (!type) throw new NotFoundException('Такого товара не существует!');
    return type;
  }

  // удаление типа товара
  async removeProductType(id: string) {
    //делаем запрос на товары, если товар с таким типом существует, то не удаляем
    const product = await this.ProductModel.findOne({ typeId: id });
    if (product)
      throw new BadRequestException('Тип не удалён,использутся в товарах');
    //делаем запрос в постер, если есть постер с таким типом,то не удаляем
    const poster = await this.PosterTypeModel.findOne({ typeId: id });
    if (poster)
      throw new BadRequestException(
        'Тип не удалён,удалите постер с этим типом',
      );
    // удаляем тип из категории
    await this.CategoryProductModel.updateMany(
      {},
      { $pull: { productType: id } },
    );
    //удаление типа
    const removeProductType = await this.ProductTypeModel.findByIdAndDelete(
      id,
    ).exec();
    if (!removeProductType)
      throw new NotFoundException('Тип продукта не удалён');
    return removeProductType;
  }
}
