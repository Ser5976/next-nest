import { GetStaticProps, NextPage } from 'next';
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
import { HeaderService } from '../header-service/header.service';

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
    return {
      props: { forCustomers, categoryProduct, productType },
      revalidate: 10,
    };
  }
);

interface AuthProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
}

export default AuthPage;
