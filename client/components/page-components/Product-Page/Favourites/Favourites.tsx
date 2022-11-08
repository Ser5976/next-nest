import styles from './Favourites.module.css';
import { FC } from 'react';
import { FavouritesProps } from './Favourites.props';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ProductService } from '../product.service';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useData } from '../../../../store/useData';
import { useRouter } from 'next/router';

const Favourites: FC<FavouritesProps> = ({ product }): JSX.Element => {
  const router = useRouter();
  //данные о авторизации
  const { authReducer } = useData();

  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном пост запросе
  const queryClient = useQueryClient();
  //  console.log('продукт в избранном:', product);
  // при помощи useQuery получем массив избранных товаров юзера
  const { data: favourites } = useQuery(
    'favourites',
    () => ProductService.getFavourites(),
    {
      enabled: !!authReducer.user, // будет запрос только если авторизован
    }
  );
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate } = useMutation(ProductService.setFavourites, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('favourites');
    },
  });
  // функция запуска mutate или редерект на auth (условие авторизованность)
  const setFavorites = () => {
    if (authReducer.user) {
      mutate(product._id);
    } else {
      router.replace(`/auth?redirect=${router.asPath}`); // вписываем в путь квэри парметрт,чтобы редеректнуть обратно
      //(в auth специально сделали хук для этого)
    }
  };
  // флаг проверки есть ли продук в избранном или не, или авторизованный
  const favouritesProduct =
    favourites?.filter((f) => f._id === product._id) || [];
  //console.log('флаг:', favouritesProduct);

  return (
    <div className={styles.link} onClick={setFavorites}>
      {favouritesProduct?.length > 0 ? (
        <>
          <MdFavorite className={styles.icons1} />
          <span>Удалить&nbsp;из&nbsp;избранного</span>
        </>
      ) : (
        <>
          <MdOutlineFavoriteBorder className={styles.icons1} />
          <span>Добавить&nbsp;в&nbsp;избранное</span>
        </>
      )}
    </div>
  );
};

export default Favourites;
