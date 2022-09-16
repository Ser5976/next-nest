import styles from './NewsList.module.css';
import { FC } from 'react';
import Link from 'next/link';
import { NewsListProps } from './NewsList.props';
import { dateFormatting } from '../../../utils/date-formatting'; //для форматирования даты

const NewsList: FC<NewsListProps> = ({ news }): JSX.Element => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className=" text-sm text-gray-600 underline hover:text-red-400  ">
          Главная
        </a>
      </Link>
      <h1 className="text-2xl text-gray-600 font-semibold mt-5"> Новости</h1>
      <ul className={styles.wrapper}>
        {news.map((n) => {
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
    </div>
  );
};

export default NewsList;
