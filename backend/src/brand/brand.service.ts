import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductTypeModel } from './../product-type/product-type.model';
import { ProductModel } from 'src/product/product.model';
import { UpdateLogoDto } from './dto/updatelogo.dto';
import { BrandDto } from './dto/brand.dto';
import { BrandModel } from './brand.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

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
  // получение брэндов(при запросе на сортировку делаем сортировку)
  async getBrands(searchBrand?: string) {
    let options = {};

    if (searchBrand) {
      options = {
        $or: [
          {
            name: new RegExp(searchBrand, 'i'),
          },
        ],
      };
    }
    const brands = await this.BrandModel.find(options);
    return brands;
  }

  // обновление логотипа
  async updateBarnd(id: string, dto: UpdateLogoDto) {
    const updateBrand = await this.BrandModel.findByIdAndUpdate(
      id,

      { logo: dto.logo },
      { new: true },
    );
    if (!updateBrand) throw new NotFoundException('Обнавление не произошло');
    return updateBrand;
  }
  // удаление брэнда
  async removeBrand(id: string) {
    //делаем запрос на товары, если товар с таким брэндом существует, то не удаляем
    const product = await this.ProductModel.findOne({ brandId: id });

    if (product) return { message: 'Брэнд не удалён,использутся в товарах' };
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
    return { message: 'брэнд удалён' };
  }
}
