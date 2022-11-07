import styles from './Estimation.module.css';
import { FC, useState } from 'react';
import { EstimationProps } from './Estimaton.props';
import { Rating } from 'react-simple-star-rating';
import { useMutation } from 'react-query';
import { IRatinProduct, ProductService } from '../../product.service'; //сервис для отправки данных на сервак
import { toast } from 'react-toastify';

const Estimation: FC<EstimationProps> = ({ product }): JSX.Element => {
  const [rating, setRating] = useState(0);
  //console.log(rating);
  //получение рэйтинга из Rating
  const handleRating = (rating: number) => {
    //переводим проценты в абсолютное число
    rating = (rating / 100) * 5;
    setRating(rating);
  };

  // хук useMutation из react-query,выполняет пост запросы, отправляем отзыв
  const { mutate } = useMutation(ProductService.putRating, {
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error('Оценка не принията, что пошло не так');
    },
  });
  // запускаем useMutation
  const sendRating = () => {
    if (rating) {
      const ratingProduct: IRatinProduct = {
        productId: product._id,
        value: rating,
      };
      mutate(ratingProduct);
    } else {
      toast.error('Рейтинг должен быть больше нуля');
    }
  };

  return (
    <div className={styles.wrapper}>
      <span onClick={sendRating}>Поставьте оценку:</span>

      <Rating
        ratingValue={rating}
        allowHalfIcon
        size={20}
        readonly={false}
        className={styles.rating}
        onClick={handleRating}
      />
    </div>
  );
};
export default Estimation;
