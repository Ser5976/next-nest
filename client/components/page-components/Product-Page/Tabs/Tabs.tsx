import styles from './Tabs.module.css';
import cn from 'classnames';
import { FC, useState } from 'react';
import Link from 'next/link';
import { TabsProps } from './Tabs.props';
import { useQuery } from 'react-query';
import { IReviews, ProductService } from '../product.service';
import { dateFormatting } from '../../../../utils/date-formatting';
import { Button } from '../../../ui/Button/Button';
import ReviewForm from '../Review-Form/ReviewForm';
import { useData } from '../../../../store/useData';
import { useRouter } from 'next/router';

const Tabs: FC<TabsProps> = ({ product }): JSX.Element => {
  const router = useRouter();
  const { authReducer } = useData();
  // флаг чтобы менять вкладки
  const [activeTab, setActiveTab] = useState('summary');
  // флаг для открытие формы  "добавить отзыв"
  const [openForm, setOpenForm] = useState(false);
  // открытие формы
  const openingForm = () => {
    if (authReducer.user) {
      setOpenForm(true);
    } else {
      router.replace(`/auth?redirect=${router.asPath}`);
    }
  };
  // при помощи useQuery получаю отзывы
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery(['product list', product._id], () =>
    ProductService.getReviews(product._id)
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
            {openForm && <ReviewForm />}
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
            <ul>
              {reviews?.map((r: IReviews) => {
                return (
                  <li className="py-2" key={r._id}>
                    <h1 className=" font-semibold">{r.name}</h1>
                    <span className=" text-xs text-gray-400">
                      {dateFormatting(r.createdAt)}
                    </span>
                    <p>{r.text}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
