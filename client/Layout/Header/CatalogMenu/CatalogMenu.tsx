import cn from 'classnames';
import styles from './CatalogMenu.module.css';
import Link from 'next/link';
import { CatalogMenuProps } from './CatalogMenu.props';
import { useClickOutside } from '../../../hook/clickOutside';
import { SiScrollreveal } from 'react-icons/si';
import { AiOutlineClose } from 'react-icons/ai';

export const CatalogMenu = ({
  className,
  ...props
}: CatalogMenuProps): JSX.Element => {
  const { ref, isShow, setIsShow } = useClickOutside(true); //кастомный хук (используем для закрытия dropdown по клику снаружи)

  return (
    <>
      <button
        className={cn(className, styles.catalog)}
        ref={ref}
        onClick={() => setIsShow(!isShow)}
        {...props}
      >
        Каталог товаров
        <span>{isShow ? <SiScrollreveal /> : <AiOutlineClose />}</span>
      </button>

      {/* выпадающий список */}
      <div
        className={cn(styles.show, {
          [styles.hidden]: isShow,
        })}
      >
        <div className={styles.wrapper}>
          <ul className={styles.block1}>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
            <li>
              <a href="#">Earnings</a>
            </li>
            <li>
              <a href="#">Sign out</a>
            </li>
          </ul>
          <div className={styles.block2}>
            <h1>Бытовая техника</h1>
            <ul className={styles.brands}>
              <li>
                <a href="#">Lg</a>
              </li>
              <li>
                <a href="#">Bosch</a>
              </li>
              <li>
                <a href="#">Samsung</a>
              </li>
              <li>
                <a href="#">Indesit</a>
              </li>
            </ul>

            <ul className={styles.productType}>
              <li>
                <a href="#">Холодильники </a>
              </li>
              <li>
                <a href="#">Стиральные машины</a>
              </li>
              <li>
                <a href="#">Газовые плиты</a>
              </li>
              <li>
                <a href="#">Микроволновки</a>
              </li>
              <li>
                <a href="#">Посудомоечные машины </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
