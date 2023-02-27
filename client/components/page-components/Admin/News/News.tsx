import styles from './News.module.css';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { NewsProps } from './News.props';
import { LayoutAdmin } from '../LayoutAdmin';
import { useQuery } from 'react-query';
import { AdminService } from '../admin.service';
import { toast } from 'react-toastify';
import { INews } from '../../News-List/NewsList.props';
import NewsItem from './News-Item/NewsItem';
import AddNewsModal from './Add-News/AddNewsModal';
import { useDebounce } from '../useDebounce';
import { SearchInputAdmin } from '../Search-Input/SearchInputAdmin';

const News: FC<NewsProps> = ({}): JSX.Element => {
  //открытие модального окна для редактирование новостей
  const [show, setShow] = useState(false);
  //стейт для инпута(поиск)
  const [searchTerm, setSearchTerm] = useState('');
  //обработчик инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  //кастомный хук для задержки времени передачи данных из инпута поиска  в запрос useQuery
  const debouncedSearch = useDebounce(searchTerm, 700);
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
    ['news', debouncedSearch],
    () => AdminService.getNews(debouncedSearch),

    {
      onError: () => {
        toast.error('Данные не получены, попробуйте ещё раз');
      },
      enabled: !!searchTerm,
    }
  );
  // из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
  // поэтому- этот костыль(и+1 к рендеренгу)
  console.log('рендеринг');
  useEffect(() => {
    refetch();
  }, [searchTerm]);
  // console.log('рендеринг');
  return (
    <LayoutAdmin activeMenu="news">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">Новости</h1>
      <div className={styles.container}>
        <SearchInputAdmin
          searchTerm={searchTerm}
          handleInput={handlerInput}
          placeholderText="введите название статьи . . ."
        />
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
              refetch={refetch}
              setShow={setShow}
              setSelectedNews={setSelectedNews}
            />
          );
        })
      )}
      <AddNewsModal
        setShow={setShow}
        show={show}
        refetch={refetch}
        selectedNews={selectedNews}
        setSelectedNews={setSelectedNews}
      />
    </LayoutAdmin>
  );
};

export default News;
