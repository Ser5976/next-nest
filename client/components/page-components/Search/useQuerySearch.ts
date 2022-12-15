import { SearchService } from './search.service';
import { useQuery } from 'react-query'; //билиотека react-query,которая работает с запросами
//(получает,кэширует,синхронизирует,обновляет)useQuery работает с GET запросами

export const useQueryProducts = (query: { text: string }) => {
  return useQuery(['product list', query], () =>
    SearchService.getSearch(query)
  );
};
