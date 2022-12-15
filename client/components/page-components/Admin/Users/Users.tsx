import styles from './Users.module.css';
import cn from 'classnames';
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

const Users: FC<UsersProps> = ({}): JSX.Element => {
  //стейт для инпута(поиск пользователя)
  const [searchTerm, setSearchTerm] = useState('');
  //обработчик инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  //кастомный хук для задержки времени передачи данных из инпута поиска пользователя в запрос useQuery
  const debouncedSearch = useDebounce(searchTerm, 700);

  //получаем данные по пользователям из стэйта
  const {
    adminReducer: { usersForAdmin },
  } = useData();
  const { users } = usersForAdmin;

  // получаем экшены
  const { getUsersForAdmin, searchUser } = useActions();

  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами

  //получаем  все данные (из базы) по пользователям и записываем их в стор(редакс)
  const { isLoading, refetch } = useQuery(
    'users-for-admin',
    () => AdminService.getUsersAdmin(),

    {
      onSuccess: (usersForAdmin) => {
        getUsersForAdmin(usersForAdmin);
      },
      onError: () => {
        toast.error('данные не получены, попробуйте ещё раз');
      },
    }
  );

  // поиск пользователя(данные берём из инпута ,
  //потом при помощи useDebounce замедляем и только потом передаём в useQuery )
  const { isLoading: loadingSearch } = useQuery(
    ['search user', debouncedSearch],
    () => AdminService.getFoundUser(debouncedSearch),
    {
      onSuccess: (usersForAdmin) => {
        searchUser(usersForAdmin);
      },
      onError: () => {
        toast.error('данные не получены ,что то пошло не так');
      },
      enabled: !!searchTerm,
    }
  );

  //запуск useQuery (запрос всех пользователей) и очистка инпута
  const repeatRaquest = () => {
    setSearchTerm('');
    refetch();
  };

  return (
    <LayoutAdmin activeMenu="users">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">
        Пользователи
      </h1>
      <div className={styles.container}>
        <SearchInputAdmin searchTerm={searchTerm} handleInput={handlerInput} />
        <div
          className={cn(styles.button, {
            [styles.disableButton]: users.users?.length === users.quantity,
          })}
          onClick={repeatRaquest}
        >
          Все пользователи
        </div>
      </div>
      {isLoading || loadingSearch ? (
        <h1 className="text-center font-semibold  text-gray-600 mt-2">
          Загрузка...
        </h1>
      ) : (
        users.users?.map((users) => {
          return <UserItem key={users._id} users={users} />;
        })
      )}
    </LayoutAdmin>
  );
};

export default Users;
