import styles from './Reviews.module.css';
import cn from 'classnames';
import { ChangeEvent, FC, useState } from 'react';
import { LayoutAdmin } from '../LayoutAdmin';
import { useData } from '../../../../store/useData';
import { useQuery } from 'react-query';
import { AdminService } from '../admin.service';
import { useActions } from '../../../../store/useActions';
import { toast } from 'react-toastify';
import { SearchInputAdmin } from '../Search-Input/SearchInputAdmin';
import { useDebounce } from '../useDebounce';
import { ReviewsProps } from './Reviews.props';
import ReviewsItem from './Reviews-Item/ReviewsItem';
import ModalResponse from '../../Response-Admin/ModalResponse'; //модальное окно для ответа на отзыв

const Reviews: FC<ReviewsProps> = ({}): JSX.Element => {
  //стейт для инпута(поиск пользователя)
  const [searchTerm, setSearchTerm] = useState('');
  //обработчик инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  //открытие модального окна для ответа админа на отзыв
  const [show, setShow] = useState(false);
  // стейт для id отзыва , чтобы админ смог написать ответ
  const [reviewId, setReviewId] = useState('');

  //кастомный хук для задержки времени передачи данных из инпута поиска пользователя в запрос useQuery
  const debouncedSearch = useDebounce(searchTerm, 700);

  //получаем данные по пользователям из стэйта
  const {
    adminReducer: { generalReviewsForAdmin },
  } = useData();
  const { reviewsForAdmin } = generalReviewsForAdmin;
  console.log('отзывы в Отзывах', reviewsForAdmin);

  // получаем экшены
  const { getReviewsForAdmin, searchReviews } = useActions();

  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами

  //получаем  все данные (из базы) по отзывам и записываем их в стор(редакс)
  const { isLoading, refetch } = useQuery(
    'reviews-admin',
    () => AdminService.getReviewsAdmin(),

    {
      onSuccess: (reviewsForAdm) => {
        getReviewsForAdmin(reviewsForAdm);
      },
      onError: () => {
        toast.error('данные не получены, попробуйте ещё раз');
      },
    }
  );
  console.log('рендеринг');
  // поиск отзыва по имени(данные берём из инпута ,
  //потом при помощи useDebounce замедляем и только потом передаём в useQuery )
  const { isLoading: loadingSearch } = useQuery(
    ['search reviews', debouncedSearch],
    () => AdminService.getFoundReviews(debouncedSearch),
    {
      onSuccess: (reviewsForAdmin) => {
        searchReviews(reviewsForAdmin);
      },
      onError: () => {
        toast.error('данные не получены ,что то пошло не так');
      },
      enabled: !!searchTerm,
    }
  );

  //запуск useQuery (запрос всех пользователей) и очистка инпута
  const repeatRaquest = () => {
    setSearchTerm('');
    refetch();
  };

  // ответ админа на отзыв(открытие модального окна и передача id отзыва в стейт)
  const openingAdminsResponse = (reviewId: string) => {
    setShow(true);
    setReviewId(reviewId);
  };

  return (
    <LayoutAdmin activeMenu="reviews">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">Отзывы</h1>
      <div className={styles.container}>
        <SearchInputAdmin
          searchTerm={searchTerm}
          handleInput={handlerInput}
          placeholderText="введите имя . . ."
        />
        <div
          className={cn(styles.button, {
            [styles.disableButton]:
              reviewsForAdmin.allReviews?.length === reviewsForAdmin.quantity,
          })}
          onClick={repeatRaquest}
        >
          Все отзывы
        </div>
      </div>
      {isLoading || loadingSearch ? (
        <h1 className="text-center font-semibold  text-gray-600 mt-2">
          Загрузка...
        </h1>
      ) : (
        reviewsForAdmin.allReviews?.map((reviews) => {
          return (
            <ReviewsItem
              key={reviews._id}
              reviews={reviews}
              openingAdminsResponse={openingAdminsResponse}
            />
          );
        })
      )}
      <ModalResponse
        setShow={setShow}
        show={show}
        reviewId={reviewId}
        update={'reviews-admin'}
      />
    </LayoutAdmin>
  );
};

export default Reviews;
