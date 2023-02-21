import styles from './NewsItem.module.css';
import { FC } from 'react';
import Link from 'next/link';
import { NewsItemProps } from './NewsItem.props';
import { dateFormatting } from '../../../utils/date-formatting'; //для форматирования даты
import { HiOutlineChevronRight } from 'react-icons/hi';
import parse from 'html-react-parser';

const NewsItem: FC<NewsItemProps> = ({ news }): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className="flex relative">
        <Link href="/">
          <a className=" text-sm text-gray-600 underline hover:text-red-400 mr-[15px] ">
            Главная
          </a>
        </Link>
        <HiOutlineChevronRight className=" absolute top-[7px] left-[53px] h-3 w-3" />
        <Link href="/news">
          <a className=" text-sm text-gray-600 underline hover:text-red-400  ">
            Новости
          </a>
        </Link>
      </div>
      <h1 className="text-2xl text-gray-600 font-semibold mt-5">{news.name}</h1>
      <span className=" text-xs text-gray-400">
        {dateFormatting(news.createdAt)}
      </span>
      <div>{parse(news.text)}</div>
    </div>
  );
};

export default NewsItem;
