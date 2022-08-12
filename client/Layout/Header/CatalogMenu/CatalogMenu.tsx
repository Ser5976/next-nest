import cn from 'classnames';
import styles from './CatalogMenu.module.css';
import Link from 'next/link';
import { CatalogMenuProps } from './CatalogMenu.props';

export const CatalogMenu = ({
  className,
  showCatalog,
  ...props
}: CatalogMenuProps): JSX.Element => {
  console.log(showCatalog);
  return (
    <div
      id="dropdown"
      className={cn(className, styles.show, {
        [styles.hidden]: showCatalog,
      })}
      {...props}
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
              <a href="#">Холодильники</a>
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
          </ul>
        </div>
      </div>
    </div>
  );
};
