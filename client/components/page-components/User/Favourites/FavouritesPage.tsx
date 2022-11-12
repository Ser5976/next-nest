import styles from './FavouritesPage.module.css';
import { FC } from 'react';
import Link from 'next/link';
import { FavouritesPageProps } from './FavouritesPage.props';
import { useData } from '../../../../store/useData';
import ProductItem from '../../Products/ProductItem/ProductItem';
import { LayoutUser } from '../LayoutUser';

const FavouritesPage: FC<FavouritesPageProps> = ({}): JSX.Element => {
  const { userReducer } = useData();
  const { userProfile, isError } = userReducer;
  return (
    <LayoutUser activeMenu="favourites">
      <div className={styles.container}>
        <h1 className="text-2xl text-gray-600 font-semibold mb-5">
          Избранные товары
        </h1>
        <ul className={styles.wrapper}>
          {isError ? (
            <h1 className=" text-center font-semibold text-red-600 mt-2">
              Что то пошло не так!
            </h1>
          ) : userProfile?.favorites?.length === 0 ? (
            <h1 className=" text-center font-semibold text-gray-600 mt-2">
              Избранных товаров нет!
            </h1>
          ) : (
            <div>
              {userProfile?.favorites?.map((product) => {
                return <ProductItem key={product._id} product={product} />;
              })}
            </div>
          )}
        </ul>
      </div>
    </LayoutUser>
  );
};

export default FavouritesPage;
