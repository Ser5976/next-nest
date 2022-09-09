import { CategoryProps } from './Category.props';
import styles from './Category.module.css';

export const Category = ({
  className,
  category, // выбранная категория для каталога
  ...props
}: CategoryProps): JSX.Element => {
  return (
    <div className={styles.block2} {...props}>
      {category === undefined && <h1>Нет данных!</h1>}
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
            <li key={type._id}>
              <a href="#">{type.name} </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
