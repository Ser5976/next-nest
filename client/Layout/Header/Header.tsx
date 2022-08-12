import { useState } from 'react';

import cn from 'classnames';
import styles from './Header.module.css';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { SiScrollreveal } from 'react-icons/si';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { CatalogMenu } from './CatalogMenu/CatalogMenu';
import { HeaderProps } from './Header.props';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  //открытие меню каталога
  const [showCatalog, setShowCatalog] = useState(false);
  const handlerMenuCatalog = () => {
    setShowCatalog(!showCatalog);
  };
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
          <button className={styles.logo}>TrainingProject</button>
          <div
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            className={styles.catalog}
            {...props}
          >
            <button onClick={handlerMenuCatalog}>Каталог товаров</button>
            <span>{showCatalog ? <SiScrollreveal /> : <AiOutlineClose />}</span>
          </div>
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

          <button>4</button>
          <button>5</button>
        </div>
        <div>3</div>
      </header>
      <div className=" relative">
        <CatalogMenu showCatalog={showCatalog} />
      </div>
    </>
  );
};
