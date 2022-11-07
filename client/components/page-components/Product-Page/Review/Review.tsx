import styles from './Review.module.css';
import { FC } from 'react';
import { ReviewProps } from './Review.props';
import { useMutation, useQueryClient } from 'react-query';
import { IReviews, ProductService } from '../product.service';
import { dateFormatting } from '../../../../utils/date-formatting';
import { useData } from '../../../../store/useData';
import { TiDeleteOutline } from 'react-icons/ti';
import { toast } from 'react-toastify';

const Review: FC<ReviewProps> = ({ review }): JSX.Element => {
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном пост запросе
  const queryClient = useQueryClient();
  const { authReducer } = useData(); //получаем данные о авторизации

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
    <ul>
      {review?.map((r: IReviews) => {
        return (
          <li className="relative py-2" key={r._id}>
            {authReducer.user?.isAdmin && (
              <TiDeleteOutline
                className={styles.icon}
                onClick={() => removeReview(r._id)}
              />
            )}
            <h1 className=" font-semibold">{r.name}</h1>
            <span className=" text-xs text-gray-400">
              {dateFormatting(r.createdAt)}
            </span>
            <p>{r.text}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Review;
