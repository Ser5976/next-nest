import styles from './EditReview.module.css';
import { FC } from 'react';
import { EditReviewProps } from './EditReview.props';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { IEditReview, UserService } from '../../user.service'; //сервис для запроса
import { Textarea } from '../../../../ui/Textarea/Textarea';
import { TiDeleteOutline } from 'react-icons/ti';

const EditReview: FC<EditReviewProps> = ({
  review, // отзыв
  setOpenForm, // для закрытия формы
}): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ text: string }>({
    mode: 'onChange',
  });
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном пост запросе
  const queryClient = useQueryClient();
  // редактирование отзыва
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: editReview } = useMutation(UserService.editReview, {
    onSuccess: () => {
      // при успешном редактировании, делаем повторный запрос на юзера ,чтобы обновить данные
      queryClient.invalidateQueries('user-profile');
      toast.success('Отзыв изменён');
    },
    onError: (error: any) => {
      toast.error('Отзыв не изменён,что-то пошло не так');
    },
  });

  // получение данных из формы и отправка на сервак
  const onSubmit = (data: { text: string }): void => {
    console.log(data);
    const editText: IEditReview = { ...data, reviewId: review._id };
    editReview(editText);
    setOpenForm(false);
  };

  return (
    <div className={styles.wrapper}>
      <TiDeleteOutline
        className={styles.icon}
        onClick={() => setOpenForm(false)}
      />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <div className="text-sm font-semibold">Редактировать отзыв:</div>
          <Textarea
            className={styles.textarea}
            autoFocus
            rows={5}
            {...register('text', {
              required: 'Обязательное поле для заполнения',
            })}
            defaultValue={review.text}
            error={errors.text}
          />
        </label>

        <input className={styles.button} type="submit" />
      </form>
    </div>
  );
};

export default EditReview;
