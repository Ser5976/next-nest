import styles from './Users.module.css';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { UsersProps } from './Users.props';
import { LayoutAdmin } from '../LayoutAdmin';
import { useData } from '../../../../store/useData';
import { useQuery } from 'react-query';
import { AdminService } from '../admin.service';
import { useActions } from '../../../../store/useActions';
import { toast } from 'react-toastify';
import UserItem from './User-Item/UserItem';
import { SearchInputAdmin } from '../Search-Input/SearchInputAdmin';
import { useDebounce } from '../useDebounce';
import { useFreshData } from '../useFreshData';

const Users: FC<UsersProps> = ({}): JSX.Element => {
  //стейт для инпута(поиск пользователя)
  const [searchTerm, setSearchTerm] = useState('');
  //обработчик инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  //кастомный хук для задержки времени передачи данных из инпута поиска пользователя в запрос useQuery
  const debouncedSearch = useDebounce(searchTerm, 500);

  //получаем данные по количеству пользователей из стэйта
  const {
    adminReducer: { userQuantity },
  } = useData();

  // получаем экшены(для изменения количества пользователей в стейте)
  const { getUserQuantity } = useActions();

  //кастомный хук,который делает поторный запросы для получения свежих данных(количество) по заказам
  //и отзывам и записывает данные в стор, это всё для меню админа
  // эти данные не зависят от админа
  //Что бы данные были актульные они запрашиваются при открытии админки(1-ая страница ,пользователи)
  // Второй раз они запрашиваются при открытии саммих страниц заказов и отзывов
  // Это позволяет нам отразить в меню непросмотренные данные
  useFreshData();

  //получаем  все данные (из базы) по пользователям
  //записываем в стор(редакс),
  //так же записываем количество пользователей в LocalStorage(что бы данные не обнулялись при перезагруки)
  // поиск пользователя(данные берём из инпута ,
  //потом при помощи useDebounce замедляем и только потом передаём в useQuery )

  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами
  const {
    isLoading,
    refetch,
    data: usersFormAdmin,
  } = useQuery(
    ['users-for-admin', debouncedSearch],
    () => AdminService.getUsersAdmin(debouncedSearch),

    {
      onSuccess: (usersForAdmin) => {
        // смотрим если количество пользователе в базе поменялось, только тогда меняем
        if (userQuantity !== usersForAdmin.quantity) {
          getUserQuantity(usersForAdmin.quantity);
        }
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
    <LayoutAdmin activeMenu="users">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">
        Пользователи
      </h1>
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
      ) : (
        usersFormAdmin?.users?.map((users) => {
          return <UserItem key={users._id} users={users} refech={refetch} />;
        })
      )}
    </LayoutAdmin>
  );
};

export default Users;
