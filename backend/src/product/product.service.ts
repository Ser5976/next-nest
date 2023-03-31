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
  //-----------создание товара------------------------------------------------------------------------------
  async create(dto: ProductDto) {
    // console.log('доставка товара', dto);
    //добавление брэнда в тип товара
    // получаем тип товара
    const typeProduct = await this.ProductTypeModel.findById(dto.typeId);

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

    //--переделываем массив объектов характиристик товара  и записываем его в выбранный тип(для фильтров)--
    //создаём массив объектов характеристик ,которые есть в типе(для изменения)

    const characteristicType = typeProduct.characteristic;

    // делаем проверку,если массив  typeProduct.characteristic пустой,создаём всё с нуля
    //если нет, то делаем проверку на похожие title
    // если такой title есть, проверяем существование значения property,
    //добавляем значение в массив property если нету
    if (characteristicType.length === 0) {
      dto.characteristic.forEach((char) => {
        characteristicType.push({
          title: char.title,
          property: [char.property],
        });
      });
    } else {
      characteristicType.forEach((newChar, index) => {
        dto.characteristic.forEach((char) => {
          if (newChar.title === char.title) {
            if (!newChar.property.includes(char.property)) {
              characteristicType[index].property.push(char.property);
            } //???
          }
        });
      });
    }
    //проверяем если такого title в typeProduct.characteristic нет создаем объект ({title:"",property:["",...]})
    dto.characteristic.forEach((char) => {
      const check = characteristicType.find((newChar) => {
        return char.title === newChar.title;
      });
      console.log('check:', check);
      if (!check) {
        characteristicType.push({
          title: char.title,
          property: [char.property],
        });
      }
    });

    //console.log('tP:', characteristicType);
    // перезаписываем characteristic в типе
    await this.ProductTypeModel.updateOne(
      { _id: dto.typeId },
      {
        characteristic: characteristicType,
      },
    );

    //--------//

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

  //------------ получение(или поиск для админа) всех товаров---------------------------------------------
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

  //---------получение  товаров(фильтрация,сортировка,пагинация)-----------------------------------------
  async getFilteredProducts(dto: QueryParametrsDto) {
    // console.log('Dto:', dto);
    const { typeId, brandId, minPrice, maxPrice, page = 1, limit = 3 } = dto;

    //создаём объект запроса
    const option: any = { $and: [{ typeId }] };

    //создаём клон dto,чтобы в последствии вычислить все пришедшие характеристики(мы не знаем их ключи)
    //постепенно удаляя те значения которые мы знаем
    const copyDto = { ...dto };
    delete copyDto.typeId;
    delete copyDto.page;
    delete copyDto.limit;

    //пагинация(расчитываем offset,для запроса с пагинацией )
    let offset = Number(page) * Number(limit) - Number(limit);
    // console.log('offset', offset);

    // добавления полученных брэндов  в запрос
    if (brandId) {
      // делаем проверку т.к.  может быть и строка
      const brand =
        typeof brandId === 'object' ? { $in: [...brandId] } : brandId;

      delete copyDto.brandId;
      option.$and.push({ brandId: brand });
    }

    // формируем объект запроса для  цены, больше или ровно($gte) и меньше или ровно($lte)
    if (minPrice && maxPrice) {
      const price = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      }; //формируем объект для цены{price:{$gte:число,$lte:число}}

      delete copyDto.maxPrice;
      delete copyDto.minPrice;

      option.$and.push({ price });
    }

    // формируем объект запроса  для характеристик товара {"characteristic.property":{$in:["...",...]}}
    // здесь немножко замутил
    console.log('copyDto', copyDto);
    if (Object.keys(copyDto).length !== 0) {
      const arrProperty: any = []; // сюда будем складывать наши сформированнее объекты
      // создаём массив данных из объектов,которые остались в copyDto
      const arrCopyDto: any[] = [];
      for (const key in copyDto) {
        arrCopyDto.push({ [key]: copyDto[key] });
      }

      // переделываем данные
      arrCopyDto.forEach((item) => {
        // добываем название ключей,чтобы найти потом значения
        const key = Object.keys(item);

        // делаем проверку т.к.  может быть и строка
        if (typeof item[key[0]] === 'object') {
          arrProperty.push({
            'characteristic.property': { $in: item[key[0]] },
          });
        } else {
          arrProperty.push({
            'characteristic.property': item[key[0]],
          });
        }
      });
      option.$and.push(...arrProperty);
    }

    console.log('Option:', option);

    // и наконец сам запрос
    const filteredProducts = await this.ProductModel.find(option)
      .sort({ createdAt: 'desc' })
      .skip(offset)
      .limit(Number(limit));
    const count = await this.ProductModel.find(option).count();
    //рассчёт количества страниц,для пагинации
    const pageQty = Math.ceil(count / limit);

    return { filteredProducts, count, pageQty };
  }

  //-------------получение товара-------------------------------------------------------------------------
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
  //---------------- получение популярных товаров-------------------------------------------------------------
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
  //--------------получение последних 6-ти товаров---------------------------------------------------------------
  async getLatestProduct() {
    const latestProduct = await this.ProductModel.find()
      .sort({ createdAt: 'desc' })
      .limit(6)
      .exec();
    if (!latestProduct) throw new NotFoundException('товары не получены');
    return latestProduct;
  }
  //---------------обновление товара-----------------------------------------------------------------------------
  async updateProduct(id: string, dto: ProductDto) {
    // ---перезаписываем массив объектов характиристик товара в типе товара---

    const typeProduct = await this.ProductTypeModel.findById(dto.typeId);
    const characteristicType = typeProduct.characteristic;

    if (characteristicType.length === 0) {
      dto.characteristic.forEach((char) => {
        characteristicType.push({
          title: char.title,
          property: [char.property],
        });
      });
    } else {
      characteristicType.forEach((newChar, index) => {
        dto.characteristic.forEach((char) => {
          if (newChar.title === char.title) {
            if (!newChar.property.includes(char.property)) {
              characteristicType[index].property.push(char.property);
            }
          }
        });
      });
    }
    dto.characteristic.forEach((char) => {
      const check = characteristicType.find((newChar) => {
        return char.title === newChar.title;
      });
      if (!check) {
        characteristicType.push({
          title: char.title,
          property: [char.property],
        });
      }
    });

    await this.ProductTypeModel.updateOne(
      { _id: dto.typeId },
      {
        characteristic: characteristicType,
      },
    );

    //---//
    //изменяем продук
    const newProduct = await this.ProductModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec();
    if (!newProduct) throw new NotFoundException('Обнавление не произошло');
    return newProduct;
  }

  //--------------удаление товара------------------------------------------------------------------------------
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
