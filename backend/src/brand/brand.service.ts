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
    const deletedBrand = await this.BrandModel.findByIdAndDelete(id);
    if (!deletedBrand) throw new NotFoundException('Брэнд не удалён');
    return { message: 'брэнд удалён' };
  }
}
