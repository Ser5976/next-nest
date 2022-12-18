import styles from './ReviewsItem.module.css';
import { FC } from 'react';
import { ReviewsItemProps } from './ReviewsItem.props';
import { BsChatRight } from 'react-icons/bs';
import { TiDeleteOutline, TiEdit } from 'react-icons/ti';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import { dateFormatting } from '../../../../../utils/date-formatting';

const ReviewsItem: FC<ReviewsItemProps> = ({
  reviews, //данные отзыва
  openingAdminsResponse, // ответ админа на отзыв(открытие модального окна и передача id отзыва в стейт)
}): JSX.Element => {
  const {} = reviews;
  console.log('отзывы:', reviews);
  // //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос
  const queryClient = useQueryClient();

  // удаление отзыва(только админ)
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deleteReview } = useMutation(AdminService.deleteReviews, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('reviews-admin');
      toast.success('отзыв удалён');
    },
    onError: (error: any) => {
      toast.error('отзыв не удалён,что-то пошло не так');
    },
  });
  const removeReview = () => {
    deleteReview(reviews._id);
  };
  return (
    <div className={styles.container}>
      <TiDeleteOutline
        className={styles.icon}
        onClick={() => {
          if (window.confirm(`Вы действительно хотите удалить отзыв`)) {
            removeReview();
          }
        }}
      />
      <TiEdit
        className={styles.icon1}
        onClick={() => openingAdminsResponse(reviews._id)}
      />

      <div className={styles.name}>{reviews.name}</div>
      <div className={styles.span}>{reviews.userId?.email}</div>
      <div className={styles.span}>{dateFormatting(reviews.createdAt)}</div>
      <p className={styles.text}>{reviews.text}</p>
      {reviews.response && (
        <div className={styles.containerResponse}>
          <BsChatRight className={styles.icon3} />
          <p className={styles.response}>{reviews.response}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsItem;
