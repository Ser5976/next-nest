import styles from './Menu.module.css';
import cn from 'classnames';
import { FC } from 'react';
import Link from 'next/link';
import { MenuProps } from './Menu.props';
import { FiUsers } from 'react-icons/fi';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md/index';
import { VscListOrdered, VscFeedback } from 'react-icons/vsc';
import {
  MdOutlineAdminPanelSettings,
  MdOutlineViewCarousel,
} from 'react-icons/md';
import { BsImage } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineArticle } from 'react-icons/md';
import { useData } from '../../../../store/useData';
import { useRouter } from 'next/router';

const Menu: FC<MenuProps> = ({
  activeMenu, //флаг для активной ссылки
}): JSX.Element => {
  //получаем данные  из редюссоров при помощи кастомного хука useData()
  const {
    authReducer,
    userReducer,
    adminReducer: { generalReviewsForAdmin, orders, userQuantity },
  } = useData();
  const { userProfile } = userReducer;
  const { user } = authReducer;

  const router = useRouter();
  // переменные количества для бэйджа

  const countFavourites = userProfile?.favorites?.length
    ? userProfile.favorites.length
    : 0;
  const countViewed = userProfile?.viewed?.length
    ? userProfile.viewed.length
    : 0;

  return (
    <div className={styles.container}>
      <div className={styles.link}>
        <MdOutlineAdminPanelSettings className={styles.icons} />
        Панель администратора
      </div>
      <div className="px-5 m-3 bg-transparent border-b"></div>
      <ul>
        <Link href="/admin/users">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'users',
            })}
          >
            <FiUsers
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'users',
              })}
            />
            <span
              className={cn(styles.bage, {
                [styles.activeBage]: activeMenu === 'users',
              })}
            >
              {userQuantity}
            </span>
            Пользователи
          </a>
        </Link>
        <Link href="/admin/product">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'product',
            })}
          >
            <MdOutlineProductionQuantityLimits
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'product',
              })}
            />
            <span
              className={cn(styles.bage, {
                [styles.activeBage]: activeMenu === 'product',
              })}
            >
              576
            </span>
            Товар
          </a>
        </Link>
        <Link href="/admin/reviews">
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
            {generalReviewsForAdmin.reviewsForAdmin?.quantity >= 1 ? (
              <span
                className={cn(styles.bage, {
                  [styles.activeBage]: activeMenu === 'reviews',
                })}
              >
                {generalReviewsForAdmin.reviewsForAdmin?.quantity}
              </span>
            ) : null}
            Отзывы
          </a>
        </Link>
        <Link href="/admin/orders">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'orders',
            })}
          >
            <VscListOrdered
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'orders',
              })}
            />
            {orders.ordersData?.quantity >= 1 ? (
              <span
                className={cn(styles.bage, {
                  [styles.activeBage]: activeMenu === 'orders',
                })}
              >
                {orders?.ordersData?.quantity}
              </span>
            ) : null}
            Заказы
          </a>
        </Link>
        <Link href="/admin/slider">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'slider',
            })}
          >
            <MdOutlineViewCarousel
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'slider',
              })}
            />
            Слайдер
          </a>
        </Link>
        <Link href="/admin/poster">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'poster',
            })}
          >
            <BsImage
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'poster',
              })}
            />
            Постер
          </a>
        </Link>
        <Link href="/admin/category-product">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'category',
            })}
          >
            <BiCategoryAlt
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'category',
              })}
            />
            Категория товара
          </a>
        </Link>
        <Link href="/admin/product-type">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'type',
            })}
          >
            <BiCategoryAlt
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'type',
              })}
            />
            Тип товара
          </a>
        </Link>
        <Link href="/admin/brand">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'brand',
            })}
          >
            <BiCategoryAlt
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'brand',
              })}
            />
            Брэнд
          </a>
        </Link>
        <Link href="/admin/for-customers">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'for-customers',
            })}
          >
            <MdOutlineArticle
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'for-customers',
              })}
            />
            Для клиентов
          </a>
        </Link>
        <Link href="/admin/news">
          <a
            className={cn(styles.link, {
              [styles.activeLink]: activeMenu === 'news',
            })}
          >
            <MdOutlineArticle
              className={cn(styles.icons, {
                [styles.activeIcons]: activeMenu === 'news',
              })}
            />
            Новости
          </a>
        </Link>
      </ul>
      <div className="px-5 m-3 bg-transparent border-b"></div>
      <button
        className=" relative pl-8 hover:bg-red-50 w-full flex justify-start text-red-400 py-1"
        onClick={() => router.push('/')}
      >
        <ImExit className=" absolute top-2.5 left-3 fill-red-400 " />
        Выход
      </button>
    </div>
  );
};

export default Menu;
