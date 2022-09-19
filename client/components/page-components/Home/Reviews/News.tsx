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
        <h1 className=" text-center text-base mt-5">Данных нет!!!</h1>
      ) : (
        <>
          <Link href="/news">
            <a className=" font-semibold text-gray-600 hover:text-red-500 underline ">
              Новости компании
            </a>
          </Link>
          <ul>
            {news?.slice(0, 4).map((n) => {
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
                  <p className=" truncate">{n.text}</p>
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
