import axios from 'axios';
import { API } from '../../../constants/url';
import { IFilteredProduct } from './ProductsList.props';
//сервис для запроса на сервак

export const ProductsService = {
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
};
