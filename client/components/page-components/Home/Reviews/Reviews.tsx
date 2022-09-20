import { FC } from 'react';
import styles from './Reviews.module.css';
import cn from 'classnames';
import { ReviewsProps } from './Reviews.props';
import { dateFormatting } from '../../../../utils/date-formatting';
import Link from 'next/link';

const Reviews: FC<ReviewsProps> = ({ reviews }): JSX.Element => {
  return (
    <div
      className={cn(styles.container, {
        [styles.error]: reviews?.length === 0,
      })}
    >
      {reviews?.length === 0 ? (
        <h1 className=" text-center text-base mt-5">Данных нет!!!</h1>
      ) : (
        <>
          <h1 className=" font-semibold text-gray-600 ">Отзывы покупателей</h1>

          <ul>
            {reviews?.slice(0, 1).map((r) => {
              return (
                <li className="py-2" key={r._id}>
                  <h1 className=" font-semibold text-sm">{r.name}</h1>
                  <span className=" text-xs text-gray-400">
                    {dateFormatting(r.createdAt)}
                  </span>
                  <p className="text-xs ">{r.text}</p>
                  <Link href="/store-reviews">
                    <a className=" text-xs text-blue-400 hover:text-red-400 underline block pt-5 text-right">
                      Читать полностью
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Reviews;
