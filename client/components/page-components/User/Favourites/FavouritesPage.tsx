import { FC } from 'react';
import { FavouritesPageProps } from './FavouritesPage.props';
import { useData } from '../../../../store/useData';
import ProductItem from '../../Products/ProductItem/ProductItem';
import { LayoutUser } from '../LayoutUser';
import SkeletonProduct from '../../../ui/ProductItem-Skeleton/SkeletonProduct';

const FavouritesPage: FC<FavouritesPageProps> = ({}): JSX.Element => {
  const { userReducer } = useData(); //получаем из стора  все данные по юзеру при помощи кастомного хука useData()
  const { userProfile, isError, isLoading } = userReducer;

  return (
    <LayoutUser activeMenu="favourites">
      <div>
        <h1 className="text-2xl text-gray-600 font-semibold mb-5">
          Избранные товары
        </h1>
        <ul>
          {isLoading ? (
            <SkeletonProduct item={4} />
          ) : isError ? (
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
