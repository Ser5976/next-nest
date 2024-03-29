import { IProduct } from './../Home/home.service';
import axios from 'axios';
import { API } from '../../../constants/url';
import { IFilteredProduct, IPoster } from './ProductsList.props';
import { IType } from '../../../store/type-product/interface.typeProduct';

//сервис для запроса на сервак

export const ProductsService = {
  // получение списка всех  товаров(здесь с try catch, потому что запрос будет через getStaticPaths)
  async getAllProducts() {
    try {
      const { data: products } = await axios.get<{
        products: IProduct[];
        quantity: number;
      }>(API.products.allProducts);
      return products.products;
    } catch (error) {
      const products: IProduct[] = [];
      return products;
    }
  },
  // получение товара (здесь с try catch, потому что запрос будет через getStaticProps)
  async getProduct(productId: string | string[] | undefined) {
    try {
      const { data: product } = await axios.get<IProduct>(
        `${API.product}/${productId}`
      );
      return product;
    } catch (error) {
      const product = {} as IProduct;
      return product;
    }
  },
  // получение типа товара (здесь с try catch, потому что запрос будет через getStaticProps)
  async getType(typeId: string | string[] | undefined) {
    try {
      const { data: type } = await axios.get<IType>(
        `${API.productType}/${typeId}`
      );
      return type;
    } catch (error) {
      const type = {} as IType;
      return type;
    }
  },
  // получение списка отфильтрованных  товаров
  async getFilteredProducts(query: any) {
    console.log('отправка запроса', query);
    const { data: filteredProducts } = await axios.get<IFilteredProduct>(
      API.products.filterProduct,
      {
        params: query,
      }
    );
    return filteredProducts;
  },
  //получение постера для типа товаров
  async getPosterType(typeId: string | string[] | undefined) {
    try {
      const { data: poster } = await axios.get<IPoster>(
        `${API.poster}/${typeId}`
      );
      return poster;
    } catch (error) {
      const poster = null;
      return poster;
    }
  },
};
