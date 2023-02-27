import { AdminService } from './admin.service';
import { useQuery } from 'react-query';
import { useActions } from '../../../store/useActions';

//кастомный хук,который делает поторный запросы для получения свежих данных(количество) по заказам
//и отзывам и записывает данные в стор, это всё для меню админа
// эти данные не зависят от админа
//Что бы данные были актульные они запрашиваются при открытии админки(1-ая страница ,пользователи)
// Второй раз они запрашиваются при открытии саммих страниц заказов и отзывов
// Это позволяет нам отразить в меню непросмотренные данные

export const useFreshData = () => {
  // получаем экшены
  const { getFreshOrdersQuantity, getFreshReviewsQuantity } = useActions();
  //пустая строка, это костылёк ,что бы не писать новый запрос (в бэнде и клиенте),поэтому используем старые запросы
  // в AdminService, а пустая строка это данные для поиска
  //получение заказов
  useQuery(['fresh orders', ''], () => AdminService.getOrders(''), {
    onSuccess: (data) => {
      getFreshOrdersQuantity(data.quantity);
    },
  });
  //получение отзывов
  useQuery(['fresh reviews', ''], () => AdminService.getReviewsAdmin(''), {
    onSuccess: (data) => {
      getFreshReviewsQuantity(data.quantity);
    },
  });
};
