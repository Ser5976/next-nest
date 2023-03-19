import { CategoryProps } from './Category.props';
import styles from './Category.module.css';

export const Category = ({
  category, // выбранная категория для каталога
}: CategoryProps): JSX.Element => {
  return (
    <div className={styles.block2}>
      <h1>{category?.name}</h1>

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
