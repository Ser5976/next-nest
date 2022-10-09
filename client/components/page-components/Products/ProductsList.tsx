import styles from './ProductTypes.module.css';
import { FC, useState } from 'react';
import { ProductsListProps } from './ProductsList.props';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { ProductsService } from './products.service';
import { toast } from 'react-toastify';
import Pagination from '../../ui/Pagination/Pagination';

const ProductsList: FC<ProductsListProps> = ({
  productType, // массив типов товара
  typeId, //id типа товара, выбранного из адресной строки
}): JSX.Element => {
  const router = useRouter();
  const { query } = router;
  const [limit, setLimit] = useState<number>(1);

  //номер активной сраницы
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
  // console.log('Объект запроса', objectQuery);

  // билиотека react-query работает с запросами (получает,кэширует,синхронизирует,обновляет)
  //useQuery работает с GET запросами
  const {
    isLoading,
    data: products,
    error,
  } = useQuery(['product list', objectQuery], () =>
    ProductsService.getProduct(objectQuery)
  );

  // console.log('response:', products);

  //маленький кастылек для вывода названия типа товаров
  const typeName = productType?.find((el) => el._id === typeId);
  return (
    <div>
      <h1>Типы</h1>
      <h1>{typeName?.name}</h1>
      {error ? (
        <h1 className=" text-center font-semibold text-red-600">
          Что то пошло не так!
        </h1>
      ) : isLoading ? (
        <h1 className="text-center font-semibold">Загрузка...</h1>
      ) : (
        <div>
          {products?.allProduct?.map((p) => {
            return <div key={p._id}>{p.name}</div>;
          })}
        </div>
      )}
      {Number(products?.pageQty) > 1 && (
        <Pagination
          count={products?.count}
          pageQty={products?.pageQty}
          page={page}
          limit={limit}
        />
      )}
    </div>
  );
};

export default ProductsList;
