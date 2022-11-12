import styles from './Menu.module.css';
import cn from 'classnames';
import { FC } from 'react';
import Link from 'next/link';
import { MenuProps } from './Menu.props';
import {
  MdOutlineAdminPanelSettings,
  MdOutlineFavoriteBorder,
} from 'react-icons/md';
import { VscEye, VscFeedback } from 'react-icons/vsc';
import { BsCart, BsPerson } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { useData } from '../../../../store/useData';
import { useActions } from '../../../../store/useActions';
import { useRouter } from 'next/router';

const Menu: FC<MenuProps> = ({
  activeMenu, //флаг для активной ссылки
}): JSX.Element => {
  //получаем данные  из редюссоров при помощи кастомного хука useData();
  const { authReducer, userReducer } = useData();
  const { userProfile } = userReducer;
  const { user } = authReducer;
  //получаем экшены из редюсера при помощи кастомного хука useActions();
  const { logout } = useActions();
  const router = useRouter();
  const count = 5;
  // переменные количества
  const countReviews = userProfile?.reviews?.length
    ? userProfile.reviews.length
    : 0;
  const countFavourites = userProfile?.favorites?.length
    ? userProfile.favorites.length
    : 0;
  const countViewed = userProfile?.viewed?.length
    ? userProfile.viewed.length
    : 0;

  // удаления данных авторизации
  const handleLogout = () => {
    //  router.push('/');
    logout();
  };
  return (
    <div className={styles.container}>
      <Link href="#">
        <a className={styles.link}>
          <BsCart className={styles.icons} />
          {countFavourites >= 1 ? (
            <span className={styles.bage}>{count}</span>
          ) : null}
          Корзина
        </a>
      </Link>

      <div className="px-5 m-3 bg-transparent border-b"></div>
      <ul>
        <Link href="/user/favourites">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'favourites',
            })}
          >
            <MdOutlineFavoriteBorder
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'favourites',
              })}
            />
            {countFavourites >= 1 ? (
              <span
                className={cn(styles.bage, {
                  [styles.activeBage]: activeMenu === 'favourites',
                })}
              >
                {userProfile?.favorites.length}
              </span>
            ) : null}
            Избранные товары
          </a>
        </Link>
        <Link href="#">
          <a className={styles.link}>
            <VscEye className={styles.icons} />
            {countViewed >= 1 ? (
              <span className={styles.bage}>{userProfile?.viewed.length}</span>
            ) : null}
            Просмотренные
          </a>
        </Link>
        <Link href="#">
          <a className={styles.link}>
            <VscFeedback className={styles.icons} />
            {countReviews >= 1 ? (
              <span className={styles.bage}>{userProfile?.reviews.length}</span>
            ) : null}
            Отзывы
          </a>
        </Link>
        <Link href="#">
          <a className={styles.link}>
            <BsPerson className={styles.icons} />
            Личные данные
          </a>
        </Link>
        {user?.isAdmin ? (
          <Link href="#">
            <a className={styles.link}>
              <MdOutlineAdminPanelSettings className={styles.icons} />
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
  );
};

export default Menu;
