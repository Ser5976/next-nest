import { GetStaticProps, NextPage } from 'next';
import axios from 'axios';
import { Auth } from '../components/page-components/Auth/Auth';
import { Layout } from '../Layout/Layout';
import { wrapper } from '../store/store';
import { IArticle } from '../store/customers/interface.customers';
import { API } from '../constants/url';
import { getForCustomers } from '../store/customers/customersSlice';
import { ICategoryProduct } from '../store/category-product/interface.categoryProduct';
import { getCategoryProduct } from '../store/category-product/catecoryProductSlice';
import { IType } from '../store/type-product/interface.typeProduct';
import { getProductType } from '../store/type-product/catecoryProductSlice';

const AuthPage: NextPage = () => {
  return (
    <Layout title="Auth page">
      <Auth />
    </Layout>
  );
};

// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<AuthProps> = wrapper.getStaticProps(
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
      //----------------------------------------------------------//
      return { props: { forCustomers, categoryProduct, productType } };
    } catch (error) {
      return {
        props: {
          forCustomers: [],
          categoryProduct: [],
          productType: [],
        },
      };
    }
  }
);

interface AuthProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
}

export default AuthPage;
