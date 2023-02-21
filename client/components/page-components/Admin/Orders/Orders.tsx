import styles from './Orders.module.css';
import { ChangeEvent, FC, useEffect, useState } from 'react';
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
    adminReducer: { ordersQuantity },
  } = useData();

  // получаем экшены
  const { getOrdersQuantity, getFreshOrdersQuantity } = useActions();

  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами

  //получаем  все заказы и записываем их в стор(редакс)
  const {
    isLoading,
    refetch,
    data: ordersData,
  } = useQuery(
    ['orders', debouncedSearch],
    () => AdminService.getOrders(debouncedSearch),

    {
      onSuccess: (ordersData) => {
        // смотрим если количество пользователе в базе поменялось, только тогда меняем
        if (ordersQuantity !== ordersData.quantity) {
          getOrdersQuantity(ordersData.quantity);
        }
        getFreshOrdersQuantity(ordersData.quantity);
      },
      onError: () => {
        toast.error('данные не получены, попробуйте ещё раз');
      },
      enabled: !!searchTerm,
    }
  );
  //для поиска, повторный запрос
  useEffect(() => {
    refetch();
  }, [searchTerm]);

  console.log('рендеринг');

  return (
    <LayoutAdmin activeMenu="orders">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">Заказы</h1>

      <div className={styles.container}>
        <SearchInputAdmin
          searchTerm={searchTerm}
          handleInput={handlerInput}
          placeholderText="введите email . . ."
        />
      </div>
      {isLoading ? (
        <h1 className="text-center font-semibold  text-gray-600 mt-2">
          Загрузка...
        </h1>
      ) : ordersData?.orders.length === 0 ? (
        <h3 className={styles.h3}>Заказов нет!</h3>
      ) : (
        <>
          <div className={styles.containerLabel}>
            <div className={styles.label}>Имя</div>
            <div className={styles.label}>Дата заказа</div>
            <div className={styles.label}>Выполнение</div>
          </div>
          {ordersData?.orders.map((order) => {
            return <OrderItem key={order._id} order={order} refech={refetch} />;
          })}
        </>
      )}
    </LayoutAdmin>
  );
};

export default Orders;
