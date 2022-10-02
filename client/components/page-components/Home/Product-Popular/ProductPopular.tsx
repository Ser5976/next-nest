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
      <div
        className={cn({
          [styles.container]: popular.length !== 0,
          [styles.error]: popular.length === 0,
        })}
      >
        {popular.length === 0 ? (
          <h1 className=" text-center mt-10">Данных нет!!!</h1>
        ) : (
          popular.map((item) => {
            return <PopularItem key={item._id} popular={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default ProductPopular;
