import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { HomeServise } from '../../components/page-components/Home/home.service';
import { INews } from '../../components/page-components/News-List/NewsList.props';
import { HeaderService } from '../../header-service/header.service';
import { Layout } from '../../Layout/Layout';
import { getCategoryProduct } from '../../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../../store/customers/customersSlice';
import { IArticle } from '../../store/customers/interface.customers';
import { wrapper } from '../../store/store';
import { getProductType } from '../../store/type-product/catecoryProductSlice';
import { IType } from '../../store/type-product/interface.typeProduct';
// из-за форматирования даты в компоненте NewsList происходит конфликт с серваком ( на серваке дата из базы а на клиенте отформатированная)
// поэтому при помощи динамического импорта выключаем ssr
const NewsList = dynamic(
  () => import('../../components/page-components/News-List/NewsList'),
  { ssr: false }
);

const NewsPage: NextPage<NewsPageProps> = ({ news }) => {
  return (
    <Layout title="News">
      {news.length === 0 ? (
        <h1 className=" text-center text-base mt-5">Данных нет!!!</h1>
      ) : (
        <NewsList news={news} />
      )}
    </Layout>
  );
};

// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<NewsPageProps> =
  wrapper.getStaticProps((store) => async () => {
    //---------- для Header-----------------------------------//
    //получение forCustomers (для клиентов)
    const forCustomers = await HeaderService.getForCustomers(); // кастомный сервис для запроса  для клиентов
    // отправляем данные в редакс
    store.dispatch(getForCustomers(forCustomers));

    // получение categoryProduct
    const categoryProduct = await HeaderService.getСategoryProduct(); // кастомный сервис для запроса  категории продуктов
    store.dispatch(getCategoryProduct(categoryProduct));
    //получение productType
    const productType = await HeaderService.getProductType(); //кастомный сервис для запроса  типов продуктов
    store.dispatch(getProductType(productType));
    //----------------------------------------------------------//

    //--------- получем индивидуальные данные для страницы------//
    const news = await HomeServise.getNews(); // кастомный сервис для запроса новостей

    return {
      props: { forCustomers, categoryProduct, productType, news },
      revalidate: 10,
    };
  });

interface NewsPageProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  news: INews[];
}

export default NewsPage;
