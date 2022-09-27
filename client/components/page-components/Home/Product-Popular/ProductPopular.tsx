import { FC } from 'react';
import styles from './ProductPopular.module.css';
import cn from 'classnames';
import { ProductPopularProps } from './ProductPopular.props';
import Link from 'next/link';
import PopularItem from './PopularItem/PopularItem';

const ProductPopular: FC<ProductPopularProps> = ({ popular }): JSX.Element => {
  return (
    <div>
      <h1 className="font-semibold text-gray-600 mb-2">Популярные товары</h1>
      <div className={styles.container}>
        {popular.map((item) => {
          return <PopularItem key={item._id} popular={item} />;
        })}
      </div>
    </div>
  );
};

export default ProductPopular;
