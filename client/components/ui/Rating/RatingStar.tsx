import styles from './RatingStar.module.css';
import { FC, useState } from 'react';
import { RatingStarProps } from './RatingStar.props';
import { Rating } from 'react-simple-star-rating'; // по дэфолту звёзды становяться вертикально
//  у svg дисплей block ,меняем его на inline ,чтобы стали горизонтально(см. RatingStar.module.css)

const RatingStar: FC<RatingStarProps> = ({
  rating,
  readonly = true,
}): JSX.Element => {
  let initialRating = (rating.estimation * 100) / 5; // переводим полученную оценку рэйтинга в проценты
  //т.к. этого хочет ента библиотека
  const [rat, setRat] = useState(initialRating);
  // console.log(rat);
  const handleRating = (rate: number) => {
    setRat(rate);
  };
  return (
    <div className={styles.app}>
      <Rating
        onClick={handleRating}
        ratingValue={rat}
        allowHalfIcon
        size={16}
        readonly={readonly} //только для чтения,изменять нельзя
      />
      <span className=" block text-xs text-gray-400">
        отзывов: {rating.numberRatings}
      </span>
    </div>
  );
};

export default RatingStar;
