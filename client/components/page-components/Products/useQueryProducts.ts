import { ProductsService } from './products.service'; //сервис для запроса на сервак
import { useQuery } from 'react-query'; //билиотека react-query,которая работает с запросами
//(получает,кэширует,синхронизирует,обновляет)useQuery работает с GET запросами

export const useQueryProducts = (
  objectQuery: any, //объект с параметрами запроса
  rating: boolean, // сортировка по рейтигу
  priceDown: boolean, // сортировка по цене вниз
  priceUp: boolean, //сортировка пр цене вверх
  typeId: string | string[] | undefined
) => {
  return useQuery(
    ['product list', objectQuery],
    () => ProductsService.getFilteredProducts(objectQuery),
    {
      enabled: !!typeId, //это для того чтобы запрос проходил когда typeId уже был
      //для сротировки товаров(по рейтингу, по цене)пишем херову тучу условий
      select: (data) => {
        let productsSort = data.filteredProducts;
        if (rating) {
          productsSort = data.filteredProducts.sort((a, b) =>
            a.rating.estimation > b.rating.estimation ? -1 : 1
          );
        }
        if (priceDown) {
          productsSort = data.filteredProducts.sort((a, b) =>
            a.price > b.price ? -1 : 1
          );
        }
        if (priceUp) {
          productsSort = data.filteredProducts.sort((a, b) =>
            a.price > b.price ? 1 : -1
          );
        }
        return { ...data, allProduct: productsSort };
      },
    }
  );
};
