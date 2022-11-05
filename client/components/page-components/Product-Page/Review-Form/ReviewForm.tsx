import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { FC, useState } from 'react';
import { ReviewFormProps } from './ReviewForm.props';
import { Rating } from 'react-simple-star-rating';
import { Input } from '../../../ui/Input/Input';
import { Textarea } from '../../../ui/Textarea/Textarea';

const ReviewForm: FC<ReviewFormProps> = ({}): JSX.Element => {
  const [rating, setRating] = useState(0);
  console.log(rating);
  const handleRating = (rating: number) => {
    //переводим проценты в абсолютное число
    const rat = (rating / 100) * 5;
    setRating(rat);
  };
  return (
    <form className={styles.form}>
      <label>
        <div>Имя:</div>
        <Input type="text" className={styles.input} scale="small" />
      </label>
      <label>
        <div>Email:</div>
        <Input type="email" className={styles.input} scale="small" />
      </label>
      <label>
        <div>Отзыв:</div>
        <Textarea className={styles.textarea} rows={5} />
      </label>
      <div className=" flex gap-1 mb-3">
        <span>Поставьте оценку:</span>
        <Rating
          ratingValue={rating}
          allowHalfIcon
          size={20}
          readonly={false}
          className={styles.rating}
          onClick={handleRating}
        />
      </div>
      <input className={styles.button} type="submit" />
    </form>
  );
};
export default ReviewForm;
