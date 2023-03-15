import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './SkeletonProduct.module.css';
import { SkeletonProductProps } from './SkeletonProduct.props';

const SkeletonProduct: FC<SkeletonProductProps> = ({
  item, // нужное количество элементов
}): JSX.Element => {
  return (
    <>
      {Array(item)
        .fill(0)
        .map((_, i) => (
          <div key={i} className={styles.container}>
            <div className={styles.section1}>
              <Skeleton height={112} />
            </div>
            <div className={styles.section2}>
              <Skeleton count={4} />
            </div>
            <div className={styles.section3}>
              <Skeleton count={4} />
            </div>
          </div>
        ))}
    </>
  );
};

export default SkeletonProduct;
