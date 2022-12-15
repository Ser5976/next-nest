import { IProduct } from './../Home/home.service';
import axios from 'axios';
import { API } from '../../../constants/url';
import { ParsedUrlQuery } from 'querystring';

//сервис для запроса на сервак

export const SearchService = {
  // поиск  товара
  async getSearch(query: ParsedUrlQuery) {
    console.log('поиск товара', query);
    const { data: foundProduct } = await axios.get<IProduct[] | undefined>(
      API.products.search,
      {
        params: query,
      }
    );
    return foundProduct;
  },
};
