import styles from './Reviews.module.css';
import { ChangeEvent, FC, useEffect, useState } from 'react';
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
    adminReducer: { reviewsQuantity },
  } = useData();

  // получаем экшены
  const { getReviewsQantity } = useActions();

  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами

  //получаем  все данные (из базы) по отзывам (записываем в стор(редакс,а там и в локалстор) только количества
  const {
    isLoading,
    refetch,
    data: reviewsForAdmin,
  } = useQuery(
    ['reviews-admin', debouncedSearch],
    () => AdminService.getReviewsAdmin(debouncedSearch),

    {
      onSuccess: (reviewsForAdmin) => {
        if (reviewsQuantity !== reviewsForAdmin.quantity) {
          getReviewsQantity(reviewsForAdmin.quantity);
        }
      },
      onError: () => {
        toast.error('данные не получены, попробуйте ещё раз');
      },
    }
  );
  //для поиска, повторный запрос
  useEffect(() => {
    refetch();
  }, [searchTerm, refetch]);
  console.log('рендеринг');

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
      </div>
      {isLoading ? (
        <h1 className="text-center font-semibold  text-gray-600 mt-2">
          Загрузка...
        </h1>
      ) : (
        reviewsForAdmin?.allReviews?.map((reviews) => {
          return (
            <ReviewsItem
              key={reviews._id}
              reviews={reviews}
              openingAdminsResponse={openingAdminsResponse}
              refech={refetch}
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
