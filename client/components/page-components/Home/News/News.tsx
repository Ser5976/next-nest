import { FC } from 'react';
import styles from './News.module.css';
import cn from 'classnames';
import { NewsProps } from './News.props';
import { dateFormatting } from '../../../../utils/date-formatting';
import Link from 'next/link';

const News: FC<NewsProps> = ({ news }): JSX.Element => {
  return (
    <div className={cn({ [styles.error]: news.length === 0 })}>
      {news.length === 0 ? (
        <>
          <h1 className=" font-semibold text-gray-600 underline ">
            Новости компании
          </h1>
          <h3 className=" text-center text-base mt-5">Данных нет!!!</h3>
        </>
      ) : (
        <>
          <Link href="/news">
            <a className=" font-semibold text-gray-600 hover:text-red-500 underline ">
              Новости компании
            </a>
          </Link>
          <ul>
            {news?.slice(0, 7).map((n) => {
              return (
                <li className="py-2" key={n._id}>
                  <span className=" text-xs text-gray-400">
                    {dateFormatting(n.createdAt)}
                  </span>
                  <Link href={`/news/${n._id}`}>
                    <a className="text-sm text-blue-400 hover:text-red-400 underline block">
                      {n.name}
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

export default News;
