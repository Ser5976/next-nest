import cn from 'classnames';
import styles from './AccountMenu.module.css';
import Link from 'next/link';
import { AccountMenuProps } from './AccountMenu.props';
import { useClickOutside } from '../../../hook/clickOutside';
import { MdExitToApp } from 'react-icons/md';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { ImExit } from 'react-icons/im';
import { VscEye } from 'react-icons/vsc';
import { VscFeedback } from 'react-icons/vsc';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import { useData } from '../../../store/useData'; //кастомных хук получение данных из стора
import { useEffect, useState } from 'react';
import { IUser } from '../../../store/auth/interface.auth';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { useActions } from '../../../store/useActions'; //кастомный хук получение экшенов(крутяк, useDispatch уже в нём)
import { useRouter } from 'next/router';

export const AccountMenu = ({
  className,
  userProfile, // все данные по юзеру
  ...props
}: AccountMenuProps): JSX.Element => {
  //кастомный хук (используем для закрытия dropdown по клику снаружи)
  const { ref, isShow, setIsShow } = useClickOutside(true);
  //получаем данные  из редюссоров при помощи кастомного хука useData();
  const { authReducer } = useData();
  //получаем экшены из редюсера при помощи кастомного хука useActions();
  const { logout } = useActions();
  const router = useRouter();

  //костыль,чтобы обойти ошибку гидрации,другой способ -это динамический импорт
  //суть в том ,что данные на прямую из стора,через useData,рендерется и на серваке, а данных сервак не получает,
  // а клиент получает и происходит конфликт,useEffect этот вопрос решает.
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    setUser(authReducer.user);
  }, [authReducer.user]);
  // переменные количества
  const countReviews = userProfile?.reviews.length
    ? userProfile.reviews.length
    : 0;
  const countFavourites = userProfile?.favorites.length
    ? userProfile.favorites.length
    : 0;
  const countViewed = userProfile?.viewed.length
    ? userProfile.viewed.length
    : 0;
  // удаления данных авторизации
  const handleLogout = () => {
    router.push('/');
    logout();
  };
  return (
    <>
      <button
        className={cn(className, styles.account)}
        ref={ref}
        onClick={() => setIsShow(!isShow)}
        {...props}
      >
        {user ? (
          <BsPerson className={styles.icons1} />
        ) : (
          <MdExitToApp className={styles.icons1} />
        )}
        {isShow ? (
          <IoMdArrowDropup className={styles.icons2} />
        ) : (
          <IoMdArrowDropdown className={styles.icons2} />
        )}
        Аккаунт
      </button>

      {/* меню список */}
      <div className={cn(styles.show, { [styles.hidden]: isShow })}>
        {user ? (
          <div className="  h-[auto] w-[250px] ">
            <div className=" text-center text-lg text-gray-600 font-medium mt-3">
              Аккаунт
            </div>
            <div className=" text-center text-xs text-gray-500">
              {user.email}
            </div>
            <div className="px-5 m-3 bg-transparent border-b"></div>
            <ul>
              <Link href="/user/favourites">
                <a className={styles.link}>
                  <MdOutlineFavoriteBorder className={styles.icons3} />
                  {countFavourites >= 1 ? (
                    <span className={styles.bage}>
                      {userProfile?.favorites.length}
                    </span>
                  ) : null}
                  Избранные товары
                </a>
              </Link>
              <Link href="/user/viewed">
                <a className={styles.link}>
                  <VscEye className={styles.icons3} />
                  {countViewed >= 1 ? (
                    <span className={styles.bage}>
                      {userProfile?.viewed.length}
                    </span>
                  ) : null}
                  Просмотренные
                </a>
              </Link>
              <Link href="/user/reviews">
                <a className={styles.link}>
                  <VscFeedback className={styles.icons3} />
                  {countReviews >= 1 ? (
                    <span className={styles.bage}>
                      {userProfile?.reviews.length}
                    </span>
                  ) : null}
                  Отзывы
                </a>
              </Link>
              <Link href="#">
                <a className={styles.link}>
                  <BsPerson className={styles.icons3} />
                  Личные данные
                </a>
              </Link>
              {user.isAdmin ? (
                <Link href="#">
                  <a className={styles.link}>
                    <MdOutlineAdminPanelSettings className={styles.icons3} />
                    Админ панель
                  </a>
                </Link>
              ) : null}
            </ul>
            <div className="px-5 m-3 bg-transparent border-b"></div>
            <button
              className=" relative pl-8 hover:bg-red-50 w-full flex justify-start text-red-400 py-1"
              onClick={handleLogout}
            >
              <ImExit className=" absolute top-2.5 left-3 fill-red-400 " />
              Выход
            </button>
          </div>
        ) : (
          <div className=" flex flex-col py-5 w-[250px] items-center">
            <BsPersonFill className=" w-[30px] h-[30px] top-0 right-0 fill-gray-400 mb-3" />
            <Link href="/auth">
              <a className={styles.entry}>Вход</a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
