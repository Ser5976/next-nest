import styles from './SearchPage.module.css';
import { FC } from 'react';
import { SearchPageProps } from './SearchPage.props';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from 'react-query';
import ProductItem from '../Products/ProductItem/ProductItem';
import { SearchService } from './search.service';

const SearchPage: FC<SearchPageProps> = ({}): JSX.Element => {
  // роутер некста,
  const router = useRouter();
  // объект query содержит query параметры из адресной строки(передали из инпута  search), используем их для запроса
  const { query } = router;

  console.log('Query:', query);

  const {
    isLoading,
    data: foundProduct,
    error,
  } = useQuery(['product list', query], () => SearchService.getSearch(query), {
    enabled: !!query.text,
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <Link href="/">
            <a className=" text-sm text-gray-600 underline hover:text-red-400  ">
              Главная
            </a>
          </Link>
          <h1 className="text-2xl text-gray-600 font-semibold mt-5 mb-2">
            Результаты поиска
          </h1>

          {error ? (
            <h1 className=" text-center font-semibold text-red-600 mt-2">
              Что то пошло не так!
            </h1>
          ) : isLoading ? (
            <h1 className="text-center font-semibold  text-gray-600 mt-2">
              Загрузка...
            </h1>
          ) : foundProduct?.length === 0 ? (
            <h1 className=" text-center font-semibold text-gray-600 mt-2">
              Товаров по данному запросу не найдено!
            </h1>
          ) : (
            <div>
              {foundProduct?.map((product: any) => {
                return <ProductItem key={product._id} product={product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
