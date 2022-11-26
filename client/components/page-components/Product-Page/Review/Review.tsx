import styles from './Review.module.css';
import { FC, useState } from 'react';
import { ReviewProps } from './Review.props';
import { useMutation, useQueryClient } from 'react-query';
import { IReviews, ProductService } from '../product.service';
import { dateFormatting } from '../../../../utils/date-formatting';
import { useData } from '../../../../store/useData';
import { TiDeleteOutline, TiEdit } from 'react-icons/ti';
import { toast } from 'react-toastify';
import { BsChatRight } from 'react-icons/bs';
import ModalResponse from '../../Response-Admin/ModalResponse';

const Review: FC<ReviewProps> = ({ review }): JSX.Element => {
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном пост запросе
  const queryClient = useQueryClient();
  const { authReducer } = useData(); //получаем данные о авторизации

  //открытие модального окна для ответа админа на отзыв
  const [show, setShow] = useState(false);
  // стейт для id отзыва , чтобы админ смог написать ответ
  const [reviewId, setReviewId] = useState('');

  // ответ админа на отзыв(открытие модального окна и передача id отзыва в стейт)
  const openingAdminsResponse = (reviewId: string) => {
    setShow(true);
    setReviewId(reviewId);
  };

  // удаление отзыва(только админ)
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: removeReview } = useMutation(ProductService.removeReview, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('reviews');
      toast.success('Отзыв удалён');
    },
    onError: (error: any) => {
      toast.error('Отзыв не удалён,что-то пошло не так');
    },
  });

  return (
    <>
      <ul>
        {review?.map((r: IReviews) => {
          return (
            <li className="relative py-2" key={r._id}>
              {authReducer.user?.isAdmin && (
                <>
                  <TiDeleteOutline
                    className={styles.icon}
                    onClick={() => {
                      if (
                        window.confirm(`Вы действительно хотите удалить отзыв`)
                      ) {
                        removeReview(r._id);
                      }
                    }}
                  />
                  <TiEdit
                    className={styles.icon1}
                    onClick={() => openingAdminsResponse(r._id)}
                  />
                </>
              )}
              <h1 className=" font-semibold">{r.name}</h1>
              <span className=" text-xs text-gray-400">
                {dateFormatting(r.createdAt)}
              </span>
              <p>{r.text}</p>
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
      <ModalResponse
        setShow={setShow}
        show={show}
        reviewId={reviewId}
        update="reviews"
      />
    </>
  );
};

export default Review;
