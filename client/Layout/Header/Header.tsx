import cn from 'classnames';
import Link from 'next/link';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';
import { CatalogMenu } from './CatalogMenu/CatalogMenu';
import { AccountMenu } from './AccountMenu/AccountMenu';
import { useData } from '../../store/useData';
import { SearchInput } from './SearchInput/SearchInput';
import { useQuery } from 'react-query';
import { HeaderService } from '../../header-service/header.service'; //сервис для запросов
import { useActions } from '../../store/useActions';
import { CartLink } from './Cart-Link/CartLink';
import { FC } from 'react';

export const Header: FC<HeaderProps> = ({}) => {
  //получаем экшены из редюсера при помощи кастомного хука useActions();
  const { getUser, getError } = useActions();
  //получаем данные  из редюссоров при помощи кастомного хука useData();
  const { forCustomersReducer, productTypeReducer, authReducer, userReducer } =
    useData();

  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами
  //получаем  все данные (из базы) по юзеру и записываем их в стор(редакс)
  useQuery('user-profile', () => HeaderService.getUserProfile(), {
    onSuccess: (dataUser) => {
      // console.log('success работает:', dataUser);
      // передаём данные в стор
      getError(false);
      getUser(dataUser);
    },
    onError: () => {
      getError(true);
    },
    enabled: !!authReducer.user, //делает запрос только при авторизованности
  });
  // console.log('User', userProfile);

  return (
    <>
      <header className={cn(styles.header)}>
        <ul className={styles.header1}>
          {forCustomersReducer.forCustomers.length === 0 && (
            <h1>Нет данных!!!</h1>
          )}
          {forCustomersReducer.forCustomers?.map((article) => {
            return (
              <Link key={article._id} href={`/for-customers/${article.slug}`}>
                <a>{article.title}</a>
              </Link>
            );
          })}
        </ul>
        <div className={styles.header2}>
          <Link href="/">
            <a className={styles.logo}>TrainingProject</a>
          </Link>
          <CatalogMenu />
          <SearchInput />
          <AccountMenu userProfile={userReducer.userProfile} />
          <CartLink />
        </div>
        <div className="   bg-gradient-to-l from-lime-400 via-amber-400 to-red-400">
          <ul className=" flex   justify-center text-white text-base items-center ">
            {productTypeReducer.productType.length === 0 && (
              <h1 className="py-3 px-5">Нет данных!!!</h1>
            )}
            {productTypeReducer.productType.slice(0, 11).map((element) => {
              return (
                <a
                  href={`/products/${element._id}`}
                  key={element._id}
                  className=" hover:bg-red-400 py-3 px-5 truncate max-w-[200px]"
                >
                  {element.name}
                </a>
              );
            })}
          </ul>
        </div>
      </header>
    </>
  );
};
