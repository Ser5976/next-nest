import styles from './Sort.module.css';
import { FC } from 'react';
import cn from 'classnames';
import { SortProps } from './Sort.props';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const Sort: FC<SortProps> = ({
  rating,
  priceDown,
  priceUp,
  toggleRating,
  toogglePrice,
}): JSX.Element => {
  return (
    <div className={styles.sort}>
      <div className=" text-xs font-semibold text-gray-600 ">
        Сортировка по:
      </div>
      <div className=" flex gap-4">
        <div
          className={cn({
            [styles.activeRating]: rating,
            [styles.link]: !rating,
          })}
          onClick={toggleRating}
        >
          рейтингу
        </div>
        <div
          className={cn(styles.price, {
            [styles.activePrice]: priceDown || priceUp,
            [styles.link]: !priceDown || !priceUp,
          })}
          onClick={toogglePrice}
        >
          <span>цене</span>
          <span>
            {priceDown ? (
              <IoMdArrowDropdown className={styles.icons} />
            ) : priceUp ? (
              <IoMdArrowDropup className={styles.icons} />
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sort;
