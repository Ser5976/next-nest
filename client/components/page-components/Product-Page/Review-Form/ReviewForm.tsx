import styles from './ReviewForm.module.css';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ReviewFormProps } from './ReviewForm.props';
import { Input } from '../../../ui/Input/Input';
import { Textarea } from '../../../ui/Textarea/Textarea';
import { useMutation, useQueryClient } from 'react-query';
import { ProductService } from '../product.service'; //сервис для отправки данных на сервак
import { toast } from 'react-toastify';
import { TiDeleteOutline } from 'react-icons/ti';
import Estimation from './Estimation/Estimation';
import { useData } from '../../../../store/useData';

export interface IReview {
  name: string;
  text: string;
}
export interface IAddReview extends IReview {
  productId: string;
}

const ReviewForm: FC<ReviewFormProps> = ({
  product, // данные товара
  setOpenForm, // для закрытия формы
}): JSX.Element => {
  const {
    userReducer: { userProfile },
  } = useData(); // получаем данные по юзеру и немножко деструтуризируем
  // console.log('Name',userProfile?.personalData.name)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IReview>({
    mode: 'onChange',
  });
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос
  const queryClient = useQueryClient();
  // хук useMutation из react-query,выполняет пост запросы, отправляем отзыв
  const { mutate: addReview } = useMutation(ProductService.addReview, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('reviews');
      toast.success('Ваш отзыв принят');
    },
    onError: (error: any) => {
      toast.error('Отзыв не отправлен,что-то пошло не так');
    },
  });
  // получение данных из формы и отправка на сервак(отзывы и оценку)
  const onSubmit: SubmitHandler<IReview> = (data: IReview): void => {
    // console.log(data);
    const review = { ...data, productId: product._id };
    addReview(review);
    reset();
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
            defaultValue={userProfile?.personalData.name?userProfile?.personalData.name:userProfile?.email}
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
      <Estimation product={product} />
    </div>
  );
};
export default ReviewForm;
