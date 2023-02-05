import { AdminService } from './admin.service';
import { useQuery } from 'react-query';
import { useActions } from '../../../store/useActions';

//кастомный хук,который делает поторный запросы для получения свежих данных(количество) по заказам
//и отзывам и записывает данные в стор

export const useFreshData = () => {
  // получаем экшены
  const { getFreshOrdersQuantity, getFreshReviewsQuantity } = useActions();
  //пустая строка, это кастылёк ,что бы не писать новый запрос (в бэнде и клиенте),поэтому используем стары запросы

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
