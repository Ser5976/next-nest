import cn from 'classnames';
import Link from 'next/link';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';
import { AiOutlineSearch } from 'react-icons/ai';
import { CatalogMenu } from './CatalogMenu/CatalogMenu';
import { AccountMenu } from './AccountMenu/AccountMenu';
import { BsCart } from 'react-icons/bs';
import { useData } from '../../store/useData';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const count = 5;
  const { forCustomersReducer, productTypeReducer } = useData();

  return (
    <>
      <header className={cn(className, styles.header)} {...props}>
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
