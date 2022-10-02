import styles from './Pagination.module.css';
import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { PaginationProps } from './Pagination.props';
import { useRouter } from 'next/router';

const Pagination: FC<PaginationProps> = ({
  count, //количество всех товаров
  pageQty, //количество страниц
  type, // выбранный тип товара
  filter, // //данные, которые выбраны для фильтации(это брэнд и диапазон цены или просто брэнд)
  selectedPath, // выбранный путь
}): JSX.Element => {
  const router = useRouter();
  //из-за того, что я сделал два вида динамического роутинга(для примера) приходиться больше
  //заморачиваться с условиями
  // при помощи этой функции мы получаем из адресной строки номер страницы
  const receiveSearchPage = () => {
    let searchPage;
    if (router.query.page) {
      return (searchPage = router.query.page);
    }
    if (router.query.filter?.length === 2) {
      searchPage = router.query.filter;
      return searchPage[1];
    }
    return (searchPage = '1');
  };
  // console.log('searhPage:', Number(receiveSearchPage()));
  // при помощи этой функции мы получаем  путь к следующей страницы
  const receivePath = (numberPage: number) => {
    let pathPage;
    if (selectedPath === 'page') {
      return (pathPage = `/${type}/page/${numberPage}`);
    }
    if (selectedPath === 'filter') {
      return (pathPage = `/${type}/filter/${filter}/${numberPage}`);
    }
  };

  const handlePageClick = (event: any) => {
    router.push(`${receivePath(event?.selected + 1)}`);
  };
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="вперёд >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageQty}
        previousLabel="< назад"
        //  renderOnZeroPageCount={null}
        containerClassName={styles.pagination}
        pageLinkClassName={styles.pageNum}
        previousClassName={styles.pageNum}
        nextLinkClassName={styles.pageNum}
        activeLinkClassName={styles.active}
        forcePage={Number(receiveSearchPage()) - 1}
      />
    </div>
  );
};

export default Pagination;
