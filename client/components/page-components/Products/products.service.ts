import axios from 'axios';
import { API } from '../../../constants/url';
import { IFilteredProduct, IPoster } from './ProductsList.props';

//сервис для запроса на сервак

export const ProductsService = {
  // получение списка отфильтрованных  товаров
  async getProduct(query: any) {
    console.log('отправка запроса', query);
    const { data: product } = await axios.get<IFilteredProduct>(
      API.products.product,
      {
        params: query,
      }
    );
    return product;
  },
  //получение постера для типа товаров
  async getPosterType(typeId: string | string[] | undefined) {
    try {
      const { data: poster } = await axios.get<IPoster>(
        `${API.poster}/${typeId}`
      );
      return poster;
    } catch (error) {
      const poster = {} as IPoster;
      return poster;
    }
  },
};
