import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductTypeModel } from './../product-type/product-type.model';
import { ProductModel } from 'src/product/product.model';
import { BrandDto } from './dto/brand.dto';
import { BrandModel } from './brand.model';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class BrandService {
  //создание брэнда
  constructor(
    @InjectModel(BrandModel) private readonly BrandModel: ModelType<BrandModel>,
    @InjectModel(ProductModel)
    private readonly ProductModel: ModelType<ProductModel>,
    @InjectModel(ProductTypeModel)
    private readonly ProductTypeModel: ModelType<ProductTypeModel>,
    @InjectModel(CategoryProductModel)
    private readonly CategoryProductModel: ModelType<CategoryProductModel>,
  ) {}
  async createBrand(dto: BrandDto) {
    const brand = await this.BrandModel.create(dto);
    if (!brand) throw new NotFoundException('Брэнд не создан');
    return brand;
  }
  // получение брэндов(при запросе на поиск делаем поиск)
  // здесь сделал по другому,чем в категории и типе,объединил получение и поиск
  async getBrands(dto?: SearchDto) {
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
    const brands = await this.BrandModel.find(options);
    if (!brands) throw new NotFoundException('Брэнды не получены');
    console.log('сервак брэнд', brands);
    return brands;
  }

  // удаление брэнда
  async removeBrand(id: string) {
    //делаем запрос на товары, если товар с таким брэндом существует, то не удаляем
    const product = await this.ProductModel.findOne({ brandId: id });

    if (product)
      throw new BadRequestException('Брэнд не удалён,используется в товарах');
    //удаляем брэнд из типа
    const type = await this.ProductTypeModel.updateMany(
      {},
      { $pull: { brand: id } },
    );
    // удаляем брэнд из категории
    const category = await this.CategoryProductModel.updateMany(
      {},
      { $pull: { brand: id } },
    );
    //удаление брэнда
    const deletedBrand = await this.BrandModel.findByIdAndDelete(id);
    if (!deletedBrand) throw new NotFoundException('Брэнд не удалён');
    return deletedBrand;
  }
}
