import { CartDto } from './dto/cart.dto';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CartModel } from './cart.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartModel) private readonly CartModel: ModelType<CartModel>,
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}
  //добавляем товар в корзину
  async addCart(userId: string, dto: CartDto) {
    console.log('CartDto:',dto)
    const { productId } = dto;
    // проверяем если такой товар есть,увеличиваем quantity(количества) на +1 и изменяем стоимость,если нет добавляем в модель
    const product = await this.CartModel.findOne({ userId, productId }).exec();
    //  console.log(product);
    if (product) {
      const { _id, price, oldPrice, quantity } = product;
      const updateProduct = await this.CartModel.findByIdAndUpdate(_id, {
        quantity: quantity + 1,
        totalPrice: price * (quantity + 1),
        totalOldPrice: oldPrice ? oldPrice * (quantity + 1) : null,
      }).exec();
      if (!updateProduct) throw new NotFoundException('товар не добавлен');
    } else {
      const newProduct = await this.CartModel.create(
        // маленькая проверочка если есть oldPrice то добавлеем в объект totalOldPrice(старая цена)
        dto.oldPrice
          ? {
              ...dto,
              userId,
              totalPrice: dto.price,
              totalOldPrice: dto.oldPrice,
            }
          : {
              ...dto,
              userId,
              totalPrice: dto.price,
            },
      );
      // console.log('product:', newProduct);
      if (!newProduct) throw new NotFoundException('товар не добавлен');
      // добавляем id документа  юзеру
      const user = await this.UserModel.findById(userId).exec();
      //  console.log('user:', user);
      const { cart } = user;
      cart.push(newProduct._id);
      await user.save();
    }
    return { message: 'Товар добавлен в корзину' };
  }
  // получение корзины, рассчёт общей цены и количества товаров
  async getCart(userId: string) {
    const cart = await this.CartModel.find({ userId });
    const count = cart.length;
    const totalPriceProduct = cart.reduce((acc, item) => {
      return acc + (item.totalPrice ? item.totalPrice : item.price);
    }, 0);
    return { cart, count, totalPriceProduct };
  }
  // удаление товара из корзины и из массива cart у юзера
  async removingProductCart(id: string, userId: string) {
    // удаление товара из корзины
    const remoteProduct = await this.CartModel.findByIdAndDelete(id);
    if (!remoteProduct)
      throw new NotFoundException('Товар не удалён из корзины');
    // удаление id товара из массива  cart  в моделе user
    await this.UserModel.updateOne(
      { _id: userId },
      { $pull: { cart: new Types.ObjectId(id) } },
    );
    return { message: 'Товар удалён из корзины' };
  }
  // уменьшаем количества товара
  async reduceNumber(id: string) {
    // проверяем если у товара quantity(количества)  больше 1 уменьшаем на 1,а так же уменьшаем  общую стоимость
    const product = await this.CartModel.findById(id).exec();
    const { _id, price, oldPrice, quantity } = product;
    if (quantity > 1) {
      const updateProduct = await this.CartModel.findByIdAndUpdate(_id, {
        quantity: quantity - 1,
        totalPrice: price * (quantity - 1),
        totalOldPrice: oldPrice ? oldPrice * (quantity - 1) : null,
      }).exec();
      if (!updateProduct) throw new NotFoundException('изменение не произошло');
      return { message: 'изменение произошло' };
    }
  }
}
