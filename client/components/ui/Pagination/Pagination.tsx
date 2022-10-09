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

  // расчёт просмотренных товаров
  const viewedProduct = () => {
    let quatity = page * limit;
    if (quatity > Number(count)) {
      const quatityInterim = limit * (page - 1);
      const remainsP = quatity - Number(count);
      return (quatity = quatityInterim + remainsP);
    }
    return quatity;
  };

  //формируем ссылку и изменяем номер страницы
  const handlePageClick = (event: any) => {
    //при помощи window.location.search получаем параметры запроса из адресной сторки(всё ,что после вопроса)
    // при помощи конструктора new URLSearchParams обрабатываем их
    // при помощи Object.fromEntries трансформируем их в объект
    const objectQuery = {
      ...Object.fromEntries(new URLSearchParams(window.location.search)),
    };
    // меняем номер страницы
    objectQuery.page = event?.selected + 1;
    //при помощи конструктора new URLSearchParams трансформируем наш объект обратно параметры запроса
    const params = new URLSearchParams(objectQuery);
    // формируем ссылку
    push(`/products/${query.typeId}?${params.toString()}`);
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
