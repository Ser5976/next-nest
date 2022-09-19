import axios from 'axios';
import type { GetStaticProps, NextPage } from 'next';
import Home from '../components/page-components/Home/Home';
import { INews } from '../components/page-components/News-List/NewsList.props';
import { API } from '../constants/url';
import { Layout } from '../Layout/Layout';
import { getCategoryProduct } from '../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../store/customers/customersSlice';
import { IArticle } from '../store/customers/interface.customers';
import { wrapper } from '../store/store';
import { getProductType } from '../store/type-product/catecoryProductSlice';
import { IType } from '../store/type-product/interface.typeProduct';

const HomePage: NextPage<HomeProps> = ({ news }) => {
  return (
    <Layout title="Home page" description="Тренировочный проект eCommerce">
      <Home news={news} />
    </Layout>
  );
};

// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<HomeProps> = wrapper.getStaticProps(
  (store) => async () => {
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
      //------------- данные для Home ---------------------------------//
      //новости
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
  }
);

interface HomeProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  news: INews[];
}

export default HomePage;
