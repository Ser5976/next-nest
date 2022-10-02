import axios from 'axios';
import { API } from '../../../constants/url';
import { IFilteredProduct } from './ProductTypes.props';
//сервис для запроса на сервак
export const ProductTypesService = {
  async getProduct(
    typeId: string | string[] | undefined,
    page: string | string[] | undefined = '1',
    limit: number,
    filtres?: string[]
  ) {
    try {
      const { data: product } = await axios.get<IFilteredProduct>(
        API.products.product,
        {
          // параметры запроса, которые передаются в адресной строке,для фильтрации и пагинации
          params: {
            typeId, // id типа товара
            page, // номер выбранной страницы
            limit, // количества товаров на странице
            // данные для фильтрации (выбранный брэнд и диапазон цен)
            brandId: filtres?.[0],
            minPrice: filtres?.[1],
            maxPrice: filtres?.[2],
          },
        }
      );
      return product;
    } catch (error) {
      const product = {} as IFilteredProduct;
      return product;
    }
  },
};
