import { ProductModel } from 'src/product/product.model';
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
    @InjectModel(ProductModel)
    private readonly ProductModel: ModelType<ProductModel>,
  ) {}
  //создание категории товара
  async createCategoryProduct(dto: CategoryProductDto) {
    const categoryProduct = await this.CategoryProductModel.create(dto);
    if (!categoryProduct)
      throw new NotFoundException('Категория продукта не создан');
    return categoryProduct;
  }
  // получение категорий товаров
  async getCategoryProduct() {
    const categoryProduct = await this.CategoryProductModel.find()
      .populate('productType brand')
      .exec();
    if (!categoryProduct) throw new NotFoundException('Категории не получены');
    return categoryProduct;
  }
  // удаление категории товара
  async removeCategoryProduct(id: string) {
    //делаем запрос на товары, если товар с такой категорией существует, то не удаляем
    const product = await this.ProductModel.findOne({ categoryId: id });

    if (product)
      return { message: 'Категория не удалёна,использутся в товарах' };
    const removeCategoryProduct =
      await this.CategoryProductModel.findByIdAndDelete(id).exec();
    if (!removeCategoryProduct)
      throw new NotFoundException('Категория продукта не удалёна');
    return { message: 'Категория продукта удалена' };
  }
}
