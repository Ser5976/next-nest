import styles from './ReviewsPage.module.css';
import { FC, useState } from 'react';
import { ReviewsPageProps } from './ReviewsPage.props';
import { useData } from '../../../../store/useData';
import { LayoutUser } from '../LayoutUser';
import { TiDeleteOutline, TiEdit } from 'react-icons/ti';
import { useMutation, useQueryClient } from 'react-query';
import { ProductService } from '../../Product-Page/product.service'; //сервис для запроса
import { toast } from 'react-toastify';
import { dateFormatting } from '../../../../utils/date-formatting'; //кастомная ф-я по форматированию даты
import EditReview from './Edit-review/EditReview';

const ReviewsPage: FC<ReviewsPageProps> = ({}): JSX.Element => {
  const { userReducer } = useData(); //получаем из стора  все данные по юзеру при помощи кастомного хука useData()
  const { userProfile, isError } = userReducer;
  // флаг для открытие формы  "редактировать отзыв"
  const [openForm, setOpenForm] = useState(false);
  //флаг чтобы форма открывалась только у редактируемого отзыва
  const [selectedReview, setSelectedReview] = useState('');
  // открытие формы для редактирование отзыва
  const openingEditingReview = (id: string) => {
    setOpenForm(true);
    setSelectedReview(id);
  };

  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном пост запросе
  const queryClient = useQueryClient();
  // удаление отзыва
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: removeReview } = useMutation(ProductService.removeReview, {
    onSuccess: () => {
      // при успешном удалении, делаем повторный запрос на юзера ,чтобы обновить данные
      queryClient.invalidateQueries('user-profile');
      toast.success('Отзыв удалён');
    },
    onError: (error: any) => {
      toast.error('Отзыв не удалён,что-то пошло не так');
    },
  });
  return (
    <LayoutUser activeMenu="reviews">
      <div>
        <h1 className="text-2xl text-gray-600 font-semibold mb-5">Отзывы</h1>
        <ul>
          {isError ? (
            <h1 className=" text-center font-semibold text-red-600 mt-2">
              Что то пошло не так!
            </h1>
          ) : userProfile?.reviews?.length === 0 ? (
            <h1 className=" text-center font-semibold text-gray-600 mt-2">
              Отзывов нет!
            </h1>
          ) : (
            <div>
              {userProfile?.reviews?.map((review) => {
                return (
                  <li className="relative py-2 border-b" key={review._id}>
                    <TiDeleteOutline
                      className={styles.icon}
                      onClick={() => removeReview(review._id)}
                    />
                    <TiEdit
                      className={styles.icon1}
                      onClick={() => openingEditingReview(review._id)}
                    />

                    <h1 className=" font-semibold text-sm">{review.name}</h1>
                    <span className=" text-xs text-gray-400">
                      {dateFormatting(review.createdAt)}
                    </span>
                    <p className="text-sm">{review.text}</p>
                    {openForm && selectedReview === review._id && (
                      <EditReview review={review} setOpenForm={setOpenForm} />
                    )}
                  </li>
                );
              })}
            </div>
          )}
        </ul>
      </div>
    </LayoutUser>
  );
};

export default ReviewsPage;
