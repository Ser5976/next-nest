import styles from './RatingStar.module.css';
import { FC } from 'react';
import { RatingStarProps } from './RatingStar.props';
import { Rating } from 'react-simple-star-rating'; // по дэфолту звёзды становяться вертикально
//  у svg дисплей block ,меняем его на inline ,чтобы стали горизонтально(см. RatingStar.module.css)

const RatingStar: FC<RatingStarProps> = ({
  rating = { estimation: 0, numberRatings: 0 },
  readonly = true,
  size = 'small',
  numberRating = true,
}): JSX.Element => {
  let initialRating = (rating.estimation * 100) / 5; // переводим полученную оценку рэйтинга в проценты
  //т.к. этого хочет ента библиотека

  return (
    <div className={styles.app}>
      <Rating
        ratingValue={initialRating}
        allowHalfIcon
        size={size === 'small' ? 16 : 20}
        readonly={readonly} //только для чтения,изменять нельзя
      />
      {numberRating && (
        <span className=" block text-xs text-gray-400">
          оценок: {rating.numberRatings}
        </span>
      )}
    </div>
  );
};

export default RatingStar;
