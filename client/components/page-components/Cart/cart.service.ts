import { API } from '../../../constants/url';
import customAxios from '../../../custom-axios/axiox-interceptors';

export interface IAddCart {
  name: string;
  price: number;
  oldPrice?: number;
  productId: string;
  picture: string;
}
export interface ICart {
  _id: string;
  userId: string;
  productId: string;
  name: string;
  price: number;
  picture: string;
  oldPrice?: number;
  totalPrice: number;
  totalOldPrice: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface IBasketData {
  cart: ICart[];
  count: number;
  totalPriceProduct: number;
}

//сервис для запроса на сервак

export const CartService = {
  // добавление в корзину
  async addCart(data: IAddCart) {
    console.log('добавить в корзину');
    await customAxios.put(API.cart, data);
  },
  // получить корзину
  async getCart() {
    console.log('получение корзины');
    const basketData = await customAxios.get<IBasketData | undefined>(API.cart);
    return basketData.data;
  },
  // уменьшаем количества  одного товара в корзине
  async reduceQuantities(id: string) {
    console.log('уменьшение количества товара');
    await customAxios.delete(`${API.reduceQuantities}/${id}`);
  },
  // удаление товара из корзины
  async removingProductCart(id: string) {
    console.log('удаление товара из корзины');
    await customAxios.delete(`${API.cart}/${id}`);
  },
};
