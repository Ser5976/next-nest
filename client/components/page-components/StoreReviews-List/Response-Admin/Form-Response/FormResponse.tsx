import styles from './FormResponse.module.css';
import { FC } from 'react';
import { FormResponseProps } from './FormResponse.props';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { StoreReviewService } from '../../store-review.service';
import { errorCatch } from '../../../../../store/auth/auth.helper';
import { Textarea } from '../../../../ui/Textarea/Textarea';

const FormResponse: FC<FormResponseProps> = ({
  setShow,
  reviewId,
}): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ response: string }>({
    mode: 'onChange',
  });
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();
  // ответ админа на отзыв о магазине
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: responseReview } = useMutation(
    StoreReviewService.responseReview,
    {
      onSuccess: () => {
        // при успешном редактировании, делаем повторный запрос на юзера ,чтобы обновить данные
        queryClient.invalidateQueries('store-reviews');
        setShow(false);
        toast.success('Ответ принят');
      },
      onError: (error: any) => {
        error.response.status === 401 || error.response.status === 400 //условие, чтобы мы показали наше сосбщение написанное в бэке
          ? toast.error(errorCatch(error)) //errorCatch-функция ,которая обрабатывает сообщение ошибки(ошибка может быть в массиве или строке)
          : toast.error('Что-то пошло не так,попробуйте ещё раз!'); // а это для сообщений, которые мы не обработали
      },
    }
  );

  // получение данных из формы и отправка на сервак
  const onSubmit = (data: { response: string }): void => {
    // console.log(data);
    responseReview({ ...data, reviewId });
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <div className={styles.label}>Ответ</div>
        <Textarea
          className={styles.textarea}
          autoFocus
          rows={5}
          {...register('response', {
            required: 'Обязательное поле для заполнения',
          })}
          error={errors.response}
        />
      </label>

      <input className={styles.button} type="submit" value="Сохранить" />
    </form>
  );
};

export default FormResponse;
