import styles from './Favourites.module.css';
import { FC } from 'react';
import { FavouritesProps } from './Favourites.props';
import { useMutation, useQueryClient } from 'react-query';
import { ProductService } from '../product.service';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useData } from '../../../../store/useData';
import { useRouter } from 'next/router';

const Favourites: FC<FavouritesProps> = ({
  product, //данные товара
}): JSX.Element => {
  const router = useRouter();
  //данные о авторизации и все данные по юзеру
  const { authReducer, userReducer } = useData();
  const { userProfile } = userReducer;
  //хук useQueryClient, из react-query,используется чтобы сделать повторый
  const queryClient = useQueryClient();
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  // добавление или если есть удаление товара из массива favourites у юзера
  const { mutate } = useMutation(ProductService.setFavourites, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('user-profile');
    },
  });
  // функция запуска mutate или редерект на auth (условие авторизованность)
  const setFavorites = () => {
    if (authReducer.user) {
      mutate(product._id);
    } else {
      router.replace(`/auth?redirect=${router.asPath}`); // вписываем в путь квэри парметр,чтобы редеректнуть обратно
      //(в auth специально сделали хук для этого)
    }
  };
  // флаг проверки есть ли продук в избранном или нет, или авторизованный
  const favouritesProduct =
    userProfile?.favorites?.filter((f) => f._id === product._id) || [];
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
