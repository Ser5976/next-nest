import styles from './Pagination.module.css';
import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { PaginationProps } from './Pagination.props';
import { useRouter } from 'next/router';

const Pagination: FC<PaginationProps> = ({
  count, //количество всех товаров
  pageQty, //количество страниц
  page, //номер страницы
  limit, //количество товаров на странице
}): JSX.Element => {
  const { query, push } = useRouter();
  //находим базовый url,используем его в создании полной адресной строки
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
  // создаём объект в котором будем формировать адресную строку при помощи конструктора(new URL(l))
  const productsUrl = new URL('products', baseUrl);
  // все данные ,которые нам нужны для запроса, содержаться в объекте query(useRouter)
  //но у него (если у него будет значение масссив ) не мапит массив из-за типизации
  // поэтому создаём новый объект с его помощью
  let objQuery: any = {};
  for (const key in query) {
    objQuery[key] = query[key];
  }
  // удаляем из объекта свойства page и typeId, page(номер страницы)-будем менят дальше
  // typeId это параметр и он должен всегда стоять сразу после основного адреса,
  //а при создании адреса при помощи конструктора это не получается
  delete objQuery.page;
  delete objQuery.typeId;
  console.log('Page:', objQuery);
  // создаём непосредственно поисковую часть адреса
  // пришлось костыльнуть из-за значения массива(brandId)
  for (const key in objQuery) {
    if (typeof objQuery[key] === 'object') {
      objQuery[key].map((a: string) => {
        productsUrl.searchParams.append(key, a);
      });
    } else {
      productsUrl.searchParams.append(key, String(query[key]));
    }
  }

  // расчёт просмотренных товаров
  const viewedProduct = () => {
    let quatity = page * limit;
    if (quatity > Number(count)) {
      const difference = quatity - Number(count);

      return (quatity = quatity - difference);
    }
    return quatity;
  };

  //добавляем в адресс изменённый номер страницы и формируем полный адрес
  const handlePageClick = (event: any) => {
    productsUrl.searchParams.append('page', event?.selected + 1);

    //  console.log('ProductsUrl:', productsUrl);

    // формируем ссылку
    push(`/products/${query.typeId}${productsUrl.search}`);
  };
  return (
    <div>
      <div className=" text-gray-500 mt-10 text-xs text-center">
        Просмотрено {viewedProduct()} из {count}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Number(pageQty)}
        previousLabel="<"
        containerClassName={styles.pagination}
        pageLinkClassName={styles.pageNum}
        previousClassName={styles.pageNum}
        nextLinkClassName={styles.pageNum}
        activeLinkClassName={styles.active}
        disabledClassName={styles.disabled}
        forcePage={page - 1}
      />
    </div>
  );
};

export default Pagination;
