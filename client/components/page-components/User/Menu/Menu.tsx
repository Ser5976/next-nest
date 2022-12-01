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
  //получаем экшены(логаут и очистка стейта юзера) из редюсера при помощи кастомного хука useActions();
  const { logout, clearUser } = useActions();
  const router = useRouter();
  // переменные количества для бэйджа
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
    router.push('/');
    clearUser();
    logout();
  };
  return (
    <div className={styles.container}>
      <Link href="/cart">
        <a
          className={cn(styles.link, {
            [styles.activeLink]: activeMenu === 'cart',
          })}
        >
          <BsCart
            className={cn(styles.icons, {
              [styles.activeIcons]: activeMenu === 'cart',
            })}
          />
          {userProfile?.cart?.length ? (
            <span
              className={cn(styles.bage, {
                [styles.activeBage]: activeMenu === 'cart',
              })}
            >
              {userProfile?.cart.length}
            </span>
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
        <Link href="/user/viewed">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'viewed',
            })}
          >
            <VscEye
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'viewed',
              })}
            />
            {countViewed >= 1 ? (
              <span
                className={cn(styles.bage, {
                  [styles.activeBage]: activeMenu === 'viewed',
                })}
              >
                {userProfile?.viewed.length}
              </span>
            ) : null}
            Просмотренные
          </a>
        </Link>
        <Link href="/user/reviews">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'reviews',
            })}
          >
            <VscFeedback
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'reviews',
              })}
            />
            {countReviews >= 1 ? (
              <span
                className={cn(styles.bage, {
                  [styles.activeBage]: activeMenu === 'reviews',
                })}
              >
                {userProfile?.reviews.length}
              </span>
            ) : null}
            Отзывы
          </a>
        </Link>
        <Link href="/user/personal-data">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'personal-data',
            })}
          >
            <BsPerson
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'personal-data',
              })}
            />
            Личные данные
          </a>
        </Link>
        {user?.isAdmin ? (
          <Link href="/admin">
            <a
              className={cn(styles.link, {
                [styles.activeLink]: activeMenu === 'admin-panel',
              })}
            >
              <MdOutlineAdminPanelSettings
                className={cn(styles.icons, {
                  [styles.activeIcons]: activeMenu === 'admin-panel',
                })}
              />
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
