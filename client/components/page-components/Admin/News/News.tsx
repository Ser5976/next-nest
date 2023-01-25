import styles from './News.module.css';
import { FC, useEffect, useState } from 'react';
import { NewsProps } from './News.props';
import { LayoutAdmin } from '../LayoutAdmin';
import { useQuery } from 'react-query';
import { AdminService } from '../admin.service';
import { toast } from 'react-toastify';
import { INews } from '../../News-List/NewsList.props';
import NewsItem from './News-Item/NewsItem';
import AddNewsModal from './Add-News/AddNewsModal';

const News: FC<NewsProps> = ({}): JSX.Element => {
  //открытие модального окна для редактирование постера
  const [show, setShow] = useState(false);
  //стейт для выбранной новости
  const [selectedNews, setSelectedNews] = useState<INews | ''>('');
  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами

  //получаем новости
  const {
    isLoading,
    data: news,
    refetch,
  } = useQuery(
    'news',
    () => AdminService.getNews(),

    {
      onError: () => {
        toast.error('данные не получены, попробуйте ещё раз');
      },
      enabled: false,
    }
  );
  // из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
  // поэтому- этот костыль(и+1 к рендеренгу)
  useEffect(() => {
    refetch();
  }, [refetch]);
  // console.log('рендеринг');
  return (
    <LayoutAdmin activeMenu="news">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">Новости</h1>
      <div className={styles.container}>
        <div
          className={styles.button}
          onClick={() => {
            setShow(true);
          }}
        >
          Добавить новость
        </div>
      </div>
      {isLoading ? (
        <h1 className="text-center font-semibold  text-gray-600 mt-2">
          Загрузка...
        </h1>
      ) : (
        news?.map((news) => {
          return (
            <NewsItem
              key={news._id}
              news={news}
              refech={refetch}
              setShow={setShow}
              setSelectedNews={setSelectedNews}
            />
          );
        })
      )}
      <AddNewsModal
        setShow={setShow}
        show={show}
        refech={refetch}
        selectedNews={selectedNews}
        setSelectedNews={setSelectedNews}
      />
    </LayoutAdmin>
  );
};

export default News;
