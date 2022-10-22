import { CategoryProps } from './Category.props';
import styles from './Category.module.css';
import Link from 'next/link';

export const Category = ({
  className,
  category, // выбранная категория для каталога
  ...props
}: CategoryProps): JSX.Element => {
  return (
    <div className={styles.block2} {...props}>
      {category === undefined && <h1>Нет данных!!!</h1>}
      <h1>{category?.name}</h1>

      <ul className={styles.brands}>
        {category?.brand.map((brand) => {
          return (
            <li key={brand._id}>
              <a href="#">{brand.name}</a>
            </li>
          );
        })}
      </ul>

      <ul className={styles.productType}>
        {category?.productType.map((type) => {
          return (
            <a href={`/products/${type._id}`} key={type._id}>
              {type.name}
            </a>
          );
        })}
      </ul>
    </div>
  );
};
