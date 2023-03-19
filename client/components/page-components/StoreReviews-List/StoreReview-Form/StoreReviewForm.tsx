import styles from './StoreReviewForm.module.css';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StoreReviewFormProps } from './StoreReviewForm.props';
import { Input } from '../../../ui/Input/Input';
import { Textarea } from '../../../ui/Textarea/Textarea';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { TiDeleteOutline } from 'react-icons/ti';
import { useData } from '../../../../store/useData';
import { IAddStoreReview, StoreReviewService } from '../store-review.service'; //сервис для отправки данных на сервак

const StoreReviewForm: FC<StoreReviewFormProps> = ({
  setOpenForm, // для закрытия формы
}): JSX.Element => {
  const {
    userReducer: { userProfile },
  } = useData(); // получаем данные по юзеру
  // console.log('Name',userProfile?.personalData.name)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IAddStoreReview>({
    mode: 'onChange',
  });
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос
  const queryClient = useQueryClient();
  // хук useMutation из react-query,выполняет пост запросы, отправляем отзыв
  const { mutate: addStoreReview } = useMutation(
    StoreReviewService.addStoreReview,
    {
      onSuccess: (data) => {
        // при успешном изменении делает повторный запрос
        queryClient.invalidateQueries('store-reviews');
        toast.success('Ваш отзыв принят');
      },
      onError: (error: any) => {
        toast.error('Отзыв не отправлен,что-то пошло не так');
      },
    }
  );
  // получение данных из формы и отправка на сервак(отзыв о магазине)
  const onSubmit: SubmitHandler<IAddStoreReview> = (
    data: IAddStoreReview
  ): void => {
    // console.log(data);

    addStoreReview({ ...data, store: 'store' });
    reset();
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
          <div>Имя:</div>
          <Input
            type="text"
            defaultValue={userProfile?.personalData.name}
            className={styles.input}
            scale="small"
            {...register('name', {
              required: 'Обязательное поле для заполнения',
            })}
            error={errors.name}
          />
        </label>

        <label>
          <div>Отзыв:</div>
          <Textarea
            className={styles.textarea}
            autoFocus
            rows={5}
            {...register('text', {
              required: 'Обязательное поле для заполнения',
            })}
            error={errors.text}
          />
        </label>

        <input className={styles.button} type="submit" />
      </form>
    </div>
  );
};
export default StoreReviewForm;
