import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './ReviewsSkeleton.module.css';
import { ReviewsSkeletonProps } from './ReviewsSkeleton.props';

const ReviewsSkeleton: FC<ReviewsSkeletonProps> = ({
  item, // нужное количество элементов
}): JSX.Element => {
  return (
    <>
      {Array(item)
        .fill(0)
        .map((_, i) => (
          <div key={i} className={styles.wrapper}>
            <div className={styles.first}>
              <Skeleton />
            </div>
            <div className={styles.second}>
              <Skeleton />
            </div>
            <div className={styles.fhird}>
              <Skeleton count={3} />
            </div>
          </div>
        ))}
    </>
  );
};

export default ReviewsSkeleton;
