import { API } from '../../../constants/url';
import customAxios from '../../../custom-axios/axiox-interceptors';

//сервис для запроса на сервак
export interface IAddressOrder {
  city: string;
  street: string;
  house: string;
  flat: string;
}

export interface IDataShopper {
  name: string;
  email: string;
  address: IAddressOrder;
  delivery: string;
  payment: string;
  telephone: string;
}
export interface IOrder extends IDataShopper {
  orderAmount: number | undefined;
  productCart: string[];
}

export const OrderService = {
  // добавление заказа,используем кастомный axios(в него уже введён токен),
  async addOrder(data: IOrder) {
    console.log(' добавление заказа');
    await customAxios.post(API.order, data);
  },
};
