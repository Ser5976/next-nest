import styles from './StoreReviewsList.module.css';
import { FC, useState } from 'react';
import Link from 'next/link';
import { StoreReviewsListProps } from './StoreReviewsList.props';
import { dateFormatting } from '../../../utils/date-formatting'; //для форматирования даты
import { BsChatRight } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useData } from '../../../store/useData';
import { Button } from '../../ui/Button/Button';
import StoreReviewForm from './StoreReview-Form/StoreReviewForm';
import { TiDeleteOutline, TiEdit } from 'react-icons/ti';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ProductService } from '../Product-Page/product.service';
import { toast } from 'react-toastify';
import ModalResponse from './Response-Admin/ModalResponse';
import { StoreReviewService } from './store-review.service';

const StoreReviewsList: FC<StoreReviewsListProps> = ({}): JSX.Element => {
  const router = useRouter();
  const { authReducer } = useData(); // данные о авторизации
  // флаг для открытие формы  "добавить отзыв"
  const [openForm, setOpenForm] = useState(false);
  // открытие формы для отзыва
  const openingForm = () => {
    if (authReducer.user) {
      setOpenForm(true);
    } else {
      router.replace(`/auth?redirect=${router.asPath}`); // вписываем в путь квэри парметрт,чтобы редеректнуть обратно
      //(в auth специально сделали хук для этого)
    }
  };
  //открытие модального окна для ответа админа на отзыв
  const [show, setShow] = useState(false);
  // стейт для id отзыва , чтобы админ смог написать ответ
  const [reviewId, setReviewId] = useState('');

  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами
  //получаем  отзывы о магазине (из базы)
  const {
    data: storeReviews,
    isLoading,
    isError,
  } = useQuery('store-reviews', () => StoreReviewService.getStoreReviews());
  //console.log('StoreReviews', storeReviews);
  // console.log('isLoading', isLoading);
  // console.log('isError', isError);

  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();

  // удаление отзыва(только админ)
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: removeReview } = useMutation(ProductService.removeReview, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('store-reviews');
      toast.success('Отзыв удалён');
    },
    onError: (error: any) => {
      toast.error('Отзыв не удалён,что-то пошло не так');
    },
  });
  // ответ админа на отзыв(открытие модального окна и передача id отзыва в стейт)
  const openingAdminsResponse = (reviewId: string) => {
    setShow(true);
    setReviewId(reviewId);
  };
  return (
    <>
      <div className={styles.container}>
        <Link href="/">
          <a className=" text-sm text-gray-600 underline hover:text-red-400  ">
            Главная
          </a>
        </Link>
        <h1 className="text-2xl text-gray-600 font-semibold mt-5"> Отзывы</h1>
        <div className=" my-5 border-b text-gray-600 text-[15px]">
          <div>
            Уважаемые покупатели! Спасибо, что вы воспользовались нашими
            услугами. Нам важно ваше мнение о нашей работе!
            <p className=" my-2 font-semibold">
              Чтобы просто поделиться впечатлениями о нашей работе, нажмите
              кнопку ниже.
            </p>
          </div>
          <div>
            {!openForm && (
              <Button
                apperance="small"
                className=" text-xs my-5 rounded-sm block mx-auto"
                onClick={openingForm}
              >
                Добавить отзыв
              </Button>
            )}
            {openForm && <StoreReviewForm setOpenForm={setOpenForm} />}
          </div>
        </div>
        {isError ? (
          <h1 className=" text-center font-semibold text-red-600 mt-2">
            Что то пошло не так!
          </h1>
        ) : isLoading ? (
          <h1 className="text-center font-semibold  text-gray-600 mt-2">
            Загрузка...
          </h1>
        ) : storeReviews?.length === 0 ? (
          <h1 className=" text-center font-semibold text-gray-600 mt-2">
            Отзывов нет!
          </h1>
        ) : (
          <ul className={styles.wrapper}>
            {storeReviews?.map((r) => {
              return (
                <li className="py-2 relative" key={r._id}>
                  {authReducer.user?.isAdmin && (
                    <>
                      <TiDeleteOutline
                        className={styles.icon}
                        onClick={() => removeReview(r._id)}
                      />
                      <TiEdit
                        className={styles.icon1}
                        onClick={() => openingAdminsResponse(r._id)}
                      />
                    </>
                  )}
                  <h1 className=" text-gray-600 font-semibold">{r.name}</h1>
                  <span className=" text-xs text-gray-400">
                    {dateFormatting(r.createdAt)}
                  </span>
                  <p className=" text-gray-600 text-[15px]">{r.text}</p>
                  {r.response && (
                    <div className=" relative mt-2">
                      <BsChatRight className=" absolute top-1 fill-gray-400" />
                      <p className=" text-gray-400 ml-10 text-[13px] ">
                        {r.response}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <ModalResponse setShow={setShow} show={show} reviewId={reviewId} />
    </>
  );
};

export default StoreReviewsList;
