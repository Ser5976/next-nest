import { CategoryProps } from './Category.props';
import styles from './Category.module.css';
import Link from 'next/link';

export const Category = ({
  category, // выбранная категория для каталога
}: CategoryProps): JSX.Element => {
  return (
    <div className={styles.block2}>
      <h1>{category?.name}</h1>

      <ul className={styles.productType}>
        {category?.productType.map((type) => {
          return (
            <Link href={`/products/${type._id}`} key={type._id}>
              <a>{type.name}</a>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
