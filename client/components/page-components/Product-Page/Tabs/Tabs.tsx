import styles from './Tabs.module.css';
import cn from 'classnames';
import { FC, useState } from 'react';
import { TabsProps } from './Tabs.props';
import { useQuery } from 'react-query';
import { ProductService } from '../product.service'; // сервис для запросов
import { Button } from '../../../ui/Button/Button';
import ReviewForm from '../Review-Form/ReviewForm';
import { useData } from '../../../../store/useData';
import { useRouter } from 'next/router';
import Review from '../Review/Review';

const Tabs: FC<TabsProps> = ({ product }): JSX.Element => {
  const router = useRouter();
  const { authReducer } = useData(); // данные о авторизации
  // флаг чтобы менять вкладки
  const [activeTab, setActiveTab] = useState('summary');
  // флаг для открытие формы  "добавить отзыв"
  const [openForm, setOpenForm] = useState(false);
  // открытие формы
  const openingForm = () => {
    if (authReducer.user) {
      setOpenForm(true);
    } else {
      router.replace(`/auth?redirect=${router.asPath}`); // вписываем в путь квэри парметрт,чтобы редеректнуть обратно
      //(в auth специально сделали хук для этого)
    }
  };
  // при помощи useQuery получаю отзывы о товаре
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery(
    ['reviews', product._id],
    () => ProductService.getProductReviews(product._id),
    {
      enabled: !!product._id,
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div
          className={cn({
            [styles.tab]: activeTab === 'review',
            [styles.activeTab]: activeTab === 'summary',
          })}
          onClick={() => setActiveTab('summary')}
        >
          <span>Обзор</span>
        </div>
        <div
          className={cn({
            [styles.tab]: activeTab === 'summary',
            [styles.activeTab]: activeTab === 'review',
          })}
          onClick={() => setActiveTab('review')}
        >
          <span> Отзывы</span>
          {reviews?.length !== 0 && (
            <span className={styles.review}>{reviews?.length}</span>
          )}
        </div>
        <div className={styles.empty}></div>
      </div>
      <div className={styles.contents}>
        <div
          className={cn({
            [styles.content]: activeTab === 'review',
            [styles.activeContent]: activeTab === 'summary',
          })}
        >
          <div className={styles.description}>{product.description}</div>
          <h1 className=" mt-10 mb-2 text-sm font-semibold text-gray-600">
            Основные характеристики
          </h1>
          <div className={styles.characteristic}>
            {product.characteristic.map((el) => {
              return (
                <div className="flex" key={el._id}>
                  <div className="w-1/2">{el.title}</div>
                  <div className="w-1/2">{el.property}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={cn({
            [styles.content]: activeTab === 'summary',
            [styles.activeContent]: activeTab === 'review',
          })}
        >
          <div className=" w-full border-b">
            {!openForm && (
              <Button className={styles.button} onClick={openingForm}>
                Добавить отзыв
              </Button>
            )}
            {openForm && (
              <ReviewForm product={product} setOpenForm={setOpenForm} />
            )}
          </div>
          {error ? (
            <h1 className=" text-center font-semibold text-red-600 mt-2">
              Что то пошло не так!
            </h1>
          ) : isLoading ? (
            <h1 className="text-center font-semibold  text-gray-600 mt-2">
              Загрузка...
            </h1>
          ) : reviews?.length === 0 ? (
            <h1 className=" text-center font-semibold text-gray-600 mt-2">
              Отзывов нет!
            </h1>
          ) : (
            <Review review={reviews} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
