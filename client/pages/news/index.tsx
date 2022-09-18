import axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { INews } from '../../components/page-components/News-List/NewsList.props';
import { API } from '../../constants/url';
import { Layout } from '../../Layout/Layout';
import { getCategoryProduct } from '../../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../../store/customers/customersSlice';
import { IArticle } from '../../store/customers/interface.customers';
import { wrapper } from '../../store/store';
import { getProductType } from '../../store/type-product/catecoryProductSlice';
import { IType } from '../../store/type-product/interface.typeProduct';
// из-за форматирования даты в компоненте News происходит конфликт с серваком ( на серваке дата из базы а на клиенте отформатированная)
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
    try {
      //---------- для Header-----------------------------------//
      //получение forCustomers (для клиентов)
      const { data: forCustomers } = await axios.get<IArticle[]>(API.customers);
      // отправляем данные в редакс
      store.dispatch(getForCustomers(forCustomers));

      // получение categoryProduct
      const { data: categoryProduct } = await axios.get<ICategoryProduct[]>(
        API.categoryProduct
      );
      store.dispatch(getCategoryProduct(categoryProduct));
      //получение productType
      const { data: productType } = await axios.get<IType[]>(API.productType);
      store.dispatch(getProductType(productType));
      //----------------------------------------------------------//

      //--------- получем индивидуальные данные для страницы------//
      const { data: news } = await axios.get<INews[]>(API.news);

      return { props: { forCustomers, categoryProduct, productType, news } };
    } catch (error) {
      return {
        props: {
          forCustomers: [],
          categoryProduct: [],
          productType: [],
          news: [],
        },
      };
    }
  });

interface NewsPageProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  news: INews[];
}

export default NewsPage;
