import styles from './Articles.module.css';
import { FC, useEffect, useState } from 'react';
import { ArticlesProps } from './Articles.props';
import { LayoutAdmin } from '../LayoutAdmin';
import { useQuery } from 'react-query';
import { AdminService } from '../admin.service';
import { toast } from 'react-toastify';
import ArticleItem from './Article-Item/ArticleItem';
import AddArticleModal from './Add-Article/AddArticleModal';
import { IArticle } from '../../../../store/customers/interface.customers';

const Articles: FC<ArticlesProps> = ({}): JSX.Element => {
  //открытие модального окна для редактирование стать
  const [show, setShow] = useState(false);
  //стейт для выбранной статьи
  const [articel, setArticel] = useState<IArticle | ''>('');
  // билиотека react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами

  //получаем статьи
  const {
    isLoading,
    data: articles,
    refetch,
  } = useQuery(
    'articles',
    () => AdminService.getArticles(),

    {
      onError: () => {
        toast.error('данные не получены, попробуйте ещё раз');
      },
      enabled: false,
    }
  );
  // из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
  // поэтому- этот костыль
  useEffect(() => {
    refetch();
  }, []);
  console.log('рендеринг');
  return (
    <LayoutAdmin activeMenu="for-customers">
      <h1 className="text-2xl text-gray-600 font-semibold mb-3">
        Для клиентов
      </h1>
      <div className={styles.container}>
        <div
          className={styles.button}
          onClick={() => {
            setShow(true);
          }}
        >
          Добавить статью
        </div>
      </div>
      {isLoading ? (
        <h1 className="text-center font-semibold  text-gray-600 mt-2">
          Загрузка...
        </h1>
      ) : (
        articles?.map((article) => {
          return (
            <ArticleItem
              key={article._id}
              article={article}
              refetch={refetch}
              setShow={setShow}
              setArticle={setArticel}
            />
          );
        })
      )}
      <AddArticleModal
        setShow={setShow}
        show={show}
        refetch={refetch}
        article={articel}
        setArticle={setArticel}
      />
    </LayoutAdmin>
  );
};

export default Articles;
