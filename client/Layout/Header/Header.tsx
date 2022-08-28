import cn from 'classnames';
import Link from 'next/link';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';
import { AiOutlineSearch } from 'react-icons/ai';
import { CatalogMenu } from './CatalogMenu/CatalogMenu';
import { AccountMenu } from './AccountMenu/AccountMenu';
import { BsCart } from 'react-icons/bs';
import { useState } from 'react';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const count = 5;

  return (
    <>
      <header className={cn(className, styles.header)} {...props}>
        <ul className={styles.header1}>
          <Link href="#">
            <a>Доставка</a>
          </Link>
          <Link href="#">
            <a>Оплата</a>
          </Link>
          <Link href="#">
            <a>О нас</a>
          </Link>
          <Link href="#">
            <a>Контакты</a>
          </Link>
        </ul>
        <div className={styles.header2}>
          <Link href="/">
            <a className={styles.logo}>TrainingProject</a>
          </Link>

          <CatalogMenu />

          <div className={styles.search}>
            <input
              type="text"
              className={styles.input}
              placeholder="Поиск товаров . . ."
            />
            <button className={styles.searchButton}>
              <AiOutlineSearch />
            </button>
          </div>

          <AccountMenu />

          <button className={styles.cart}>
            Корзина
            <BsCart className={styles.cartIcon} />
            {count >= 1 ? <span className={styles.bage}>{count}</span> : null}
          </button>
        </div>
        <div className="   bg-gradient-to-l from-lime-400 via-amber-400 to-red-400">
          <ul className=" flex   justify-center text-white text-base items-center ">
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5 truncate max-w-[200px]">
                Холодильникииииииии
              </a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Смартфоны</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Матрасы</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Кондиционеры</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Микроволновки</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Ноутбуки</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Стиралки</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Морозилки</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Кофеварки</a>
            </Link>
            <Link href="#">
              <a className=" hover:bg-red-400 py-3 px-5">Мультиварки</a>
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
};
