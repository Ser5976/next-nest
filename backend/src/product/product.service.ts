import { UserModel } from './../user/user.model';
import { CartModel } from './../cart/cart.model';
import { SearchDto } from './dto/search.dto';
import { QueryParametrsDto } from './dto/queryParametrs.dto';
import { CategoryProductModel } from './../category-product/category-product.model';
import { ProductTypeModel } from './../product-type/product-type.model';
import { ProductDto } from './dto/product.dto';
import { ProductModel } from './product.model';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { AdminSearchDto } from './dto/admin.search.dto';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly ProductModel: ModelType<ProductModel>,
    @InjectModel(ProductTypeModel)
    private readonly ProductTypeModel: ModelType<ProductTypeModel>,
    @InjectModel(CategoryProductModel)
    private readonly CategoryProductModel: ModelType<CategoryProductModel>,
    @InjectModel(CartModel)
    private readonly CartModel: ModelType<CartModel>,
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}
  //создание товара
  async create(dto: ProductDto) {
    // console.log('доставка товара', dto);
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
    // и наконец создаём товар
    const product = await this.ProductModel.create(dto);
    if (!product) throw new NotFoundException('Товар не создан');
    return product;
  }
  // получение(или поиск для админа) всех товаров
  async getProducts(dto?: AdminSearchDto) {
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
    const products = await this.ProductModel.find(options).exec();
    if (!products) throw new NotFoundException('товары не получены');
    //получения колическтва товаров
    const quantity = await this.ProductModel.find().count().exec();
    return { products, quantity };
  }

  //получение  товаров(фильтрация,сортировка,пагинация)
  async getFilteredProducts(dto: QueryParametrsDto) {
    const { minPrice, maxPrice, page = 1, limit = 3 } = dto;
    // console.log('Dto:', dto);
    //пагинация
    let offset = Number(page) * Number(limit) - Number(limit);

    let opition = {};

    // костыль для сравнение цены больше или ровно($gte) и меньше или ровно($lte)
    if (minPrice && maxPrice) {
      const price = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      }; //формируем объект для цены{price:{$gte:число,$lte:число}}
      delete dto.minPrice; // удаляем данные из объекта, которые нам  не нужны для запроса(это числовой диапазон)
      delete dto.maxPrice;
      delete dto.limit;

      // console.log(query);
      opition = { ...dto, price };
    } else {
      opition = dto;
    }
    console.log('Option:', opition);
    const filteredProducts = await this.ProductModel.find(opition)
      .sort({ createdAt: 'desc' })
      .skip(offset)
      .limit(Number(limit));
    const count = await this.ProductModel.find(opition).count();
    //рассчёт количества страниц,для пагинации
    const pageQty = Math.ceil(count / limit);

    return { filteredProducts, count, pageQty };
  }

  //получение товара
  async byIdProduct(id: string) {
    const product = await this.ProductModel.findById(id).exec();
    // костыль, изменяем countOpenend,чтобы вычислить какой продукт больше смотрели(популярный)
    product.coundOpened = product.coundOpened + 1;
    await product.save();
    if (!product) throw new NotFoundException('Такого товара не существует!');
    return product;
  }
  //текстовый поиск товара(по слову), score-находит наибольшее совпадиние
  async textSearch(dto: SearchDto) {
    const foundProduct = await this.ProductModel.find(
      {
        $text: { $search: dto.text, $caseSensitive: false },
      },
      { score: { $meta: 'textScore' } },
    )
      .sort({ score: { $meta: 'textScore' } })
      .exec();

    return foundProduct;
  }
  // получение популярных товаров
  async getPopularProducts() {
    const popularProducts = await this.ProductModel.find({
      coundOpened: { $gt: 0 },
    })
      .sort({ coundOpened: -1 })
      .limit(6)
      .exec();

    if (!popularProducts) throw new NotFoundException('товары не получены');
    return popularProducts;
  }
  //получение последних 6-ти товаров
  async getLatestProduct() {
    const latestProduct = await this.ProductModel.find()
      .sort({ createdAt: 'desc' })
      .limit(6)
      .exec();
    if (!latestProduct) throw new NotFoundException('товары не получены');
    return latestProduct;
  }
  // обновление товара
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
    if (!deleteProduct) {
      throw new NotFoundException('Такого товара не существует');
    }
    // удаление id корзины из массива cart у пользователя(т.к. один товар может быть во многих корзинах)
    // из-за нехватки знаний нахимичил костылей
    // и так получаем все корзины где есть наш товар
    const deleteCart = await this.CartModel.find({ productId: id });
    // потом при помощи forEach поочерёдно берём id корзины и удаляем из базы
    deleteCart.forEach(async (item) => {
      await this.UserModel.updateMany({}, { $pull: { cart: item._id } });
    });
    // удаляем удалённый товар из корзины ,если он там есть
    await this.CartModel.deleteMany({
      productId: id,
    });
    // и ещё удаляем id корзины из массива корзины у пользователей

    return { message: 'Пользователь удалён' };
  }
}
