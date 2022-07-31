import { CategoryProductDto } from './dto/category-product.dto';
import { CategoryProductModel } from './category-product.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class CategoryProductService {
  constructor(
    @InjectModel(CategoryProductModel)
    private readonly CategoryProductModel: ModelType<CategoryProductModel>,
  ) {}
  //создание типа товара
  async createCategoryProduct(dto: CategoryProductDto) {
    const categoryProduct = await this.CategoryProductModel.create(dto);
    if (!categoryProduct)
      throw new NotFoundException('Категория продукта не создан');
    return categoryProduct;
  }
  // получение типов товаров
  async getCategoryProduct() {
    const categoryProduct = await this.CategoryProductModel.find()
      .populate('productType brand')
      .exec();
    if (!categoryProduct) throw new NotFoundException('Категории не получены');
    return categoryProduct;
  }
  // удаление типа товара
  async removeProductType(id: string) {
    //написать,когда будут продукты: делать проверку о наличии товаров с таким типом и только потом удальть,удалить тип из категории
    const removeCategoryProduct =
      await this.CategoryProductModel.findByIdAndDelete(id).exec();
    if (!removeCategoryProduct)
      throw new NotFoundException('Категория продукта не удалёна');
    return { message: 'Категория продукта удалена' };
  }
}
