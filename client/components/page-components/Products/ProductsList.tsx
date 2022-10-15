import styles from './ProductsList.module.css';
import { FC, useState } from 'react';
import { ProductsListProps } from './ProductsList.props';
import { useRouter } from 'next/router';
import Pagination from '../../ui/Pagination/Pagination';
import Link from 'next/link';
import Image from 'next/image';
import ProductItem from './ProductItem/ProductItem';
import { useSortCustom } from './useSortCustom';
import { useQueryProducts } from './useQueryProducts';
import Sort from './Sort/Sort'; //компонент для сортировки (по цене,рейтингу)

const ProductsList: FC<ProductsListProps> = ({
  productType, // массив типов товара
  typeId, //id типа товара, выбранного из адресной строки
  poster, //картинка и текст для страницы с типом товаров
}): JSX.Element => {
  const router = useRouter();
  const { query } = router;
  const [limit, setLimit] = useState<number>(3);

  //это для сортировки(по рентингу,по цене)замутил примитивный кастомный хук
  const { rating, priceUp, priceDown, toggleRating, toogglePrice } =
    useSortCustom();

  //номер активной сраницы.Через useState что то глючит
  const page = Number(query.page ? query.page : '1');

  //формируем объек запроса
  //при помощи window.location.search получаем параметры запроса из адресной сторки(всё ,что после вопроса)
  // при помощи конструктора new URLSearchParams обрабатываем их
  // при помощи Object.fromEntries трансформируем их в объект
  // и добавляем в наш объект
  const objectQuery = {
    typeId,
    page,
    limit,
    ...Object.fromEntries(new URLSearchParams(window.location.search)),
  };
  // console.log('Объект запроса', objectQuery)
  //кастомный хук в который входит useQuery из
  // билиотеки react-query,которая работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами
  const {
    isLoading,
    data: products,
    error,
  } = useQueryProducts(objectQuery, rating, priceDown, priceUp);

  // console.log('response:', products);

  //маленький кастылек для вывода названия типа товаров
  const typeName = productType?.find((el) => el._id === typeId);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.section1}>
          <Link href="/">
            <a className=" text-sm text-gray-600 underline hover:text-red-400  ">
              Главная
            </a>
          </Link>
          <h1 className="text-2xl text-gray-600 font-semibold mt-5 mb-2">
            {' '}
            {typeName?.name}
          </h1>
          {poster && (
            <div className={styles.poster}>
              <div className={styles.text}>{poster?.text}</div>
              <div className={styles.image}>
                <Image
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  src={`${process.env.NEXT_PUBLIC_DOMAIN}/${poster?.picture}`}
                  alt="изображения нет"
                  unoptimized
                  priority
                />
              </div>
            </div>
          )}

          <Sort
            rating={rating}
            priceDown={priceDown}
            priceUp={priceUp}
            toggleRating={toggleRating}
            toogglePrice={toogglePrice}
          />
          {error ? (
            <h1 className=" text-center font-semibold text-red-600">
              Что то пошло не так!
            </h1>
          ) : isLoading ? (
            <h1 className="text-center font-semibold">Загрузка...</h1>
          ) : (
            <div>
              {products?.allProduct?.map((product) => {
                return <ProductItem key={product._id} product={product} />;
              })}
            </div>
          )}
        </div>
        <div className={styles.section2}></div>
      </div>
      {Number(products?.pageQty) > 1 && (
        <Pagination
          count={products?.count}
          pageQty={products?.pageQty}
          page={page}
          limit={limit}
        />
      )}
    </>
  );
};

export default ProductsList;
