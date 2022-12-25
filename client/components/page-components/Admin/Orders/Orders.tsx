import styles from './Orders.module.css';
import cn from 'classnames';
import { ChangeEvent, FC, useState } from 'react';
import { OrdersProps } from './Orders.props';
import { LayoutAdmin } from '../LayoutAdmin';
import { useData } from '../../../../store/useData';
import { useQuery } from 'react-query';
import { AdminService } from '../admin.service';
import { useActions } from '../../../../store/useActions';
import { toast } from 'react-toastify';
import { SearchInputAdmin } from '../Search-Input/SearchInputAdmin';
import { useDebounce } from '../useDebounce';
import OrderItem from './Order-Item/OrderItem';

const Orders: FC<OrdersProps> = ({}): JSX.Element => {
  //стейт для инпута(поиск пользователя)
  const [searchTerm, setSearchTerm] = useState('');
  //обработчик инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  //кастомный хук для задержки времени передачи данных из инпута поиска пользователя в запрос useQuery
  const debouncedSearch = useDebounce(searchTerm, 700);

  //получаем данные по заказам из стэйта
  const {
    adminReducer: { orders },
  } = useData();
  const { ordersData } = orders;
  // получаем экшены
  const { getOrders, searchOrder } = useActions();

  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами

  //получаем  все заказы и записываем их в стор(редакс)
  const { isLoading, refetch } = useQuery(
    'orders',
    () => AdminService.getOrders(),

    {
      onSuccess: (ordersData) => {
        getOrders(ordersData);
        console.log('Заказы в реакт квэри:', ordersData);
      },
      onError: () => {
        toast.error('данные не получены, попробуйте ещё раз');
      },
    }
  );

  // поиск пользователя(данные берём из инпута ,
  //потом при помощи useDebounce замедляем и только потом передаём в useQuery )
  const { isLoading: loadingSearch } = useQuery(
    ['search order', debouncedSearch],
    () => AdminService.getFoundOrder(debouncedSearch),
    {
      onSuccess: (orders) => {
        searchOrder(orders);
      },
      onError: () => {
        toast.error('данные не получены ,что то пошло не так');
      },
      enabled: !!searchTerm,
    }
  );

  //запуск useQuery (запрос всех заказов) и очистка инпута
  const repeatRaquest = () => {
    setSearchTerm('');
    refetch();
  };

  return (
    <LayoutAdmin activeMenu="orders">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">Заказы</h1>

      <div className={styles.container}>
        <SearchInputAdmin
          searchTerm={searchTerm}
          handleInput={handlerInput}
          placeholderText="введите email . . ."
        />
        <div
          className={cn(styles.button, {
            [styles.disableButton]:
              ordersData.orders?.length === ordersData?.quantity,
          })}
          onClick={repeatRaquest}
        >
          Все заказы
        </div>
      </div>
      {isLoading || loadingSearch ? (
        <h1 className="text-center font-semibold  text-gray-600 mt-2">
          Загрузка...
        </h1>
      ) : ordersData.orders?.length === 0 ? (
        <h3 className={styles.h3}>Заказов нет!</h3>
      ) : (
        ordersData.orders?.map((order) => {
          return <OrderItem key={order._id} order={order} />;
        })
      )}
    </LayoutAdmin>
  );
};

export default Orders;
