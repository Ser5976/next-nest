import styles from './StoreReviewsList.module.css';
import { FC } from 'react';
import Link from 'next/link';
import { StoreReviewsListProps } from './StoreReviewsList.props';
import { dateFormatting } from '../../../utils/date-formatting'; //для форматирования даты
import { BsChatRight } from 'react-icons/bs';

const StoreReviewsList: FC<StoreReviewsListProps> = ({
  reviews,
}): JSX.Element => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className=" text-sm text-gray-600 underline hover:text-red-400  ">
          Главная
        </a>
      </Link>
      <h1 className="text-2xl text-gray-600 font-semibold mt-5"> Отзывы</h1>
      <ul className={styles.wrapper}>
        {reviews.map((r) => {
          return (
            <li className="py-2" key={r._id}>
              <h1 className=" font-semibold">{r.name}</h1>
              <span className=" text-xs text-gray-400">
                {dateFormatting(r.createdAt)}
              </span>
              <p>{r.text}</p>
              <div className=" relative mt-2">
                <BsChatRight className=" absolute top-1 fill-gray-400" />
                <p className=" text-gray-400 ml-10 text-sm ">{r.response}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StoreReviewsList;
