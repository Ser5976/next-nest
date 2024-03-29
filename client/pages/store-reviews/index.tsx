import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { HeaderService } from '../../header-service/header.service';
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
const StoreReviewsList = dynamic(
  () =>
    import(
      '../../components/page-components/StoreReviews-List/StoreReviewsList'
    ),
  { ssr: false }
);

const StoreReviewsPage: NextPage<StoreReviewsProps> = ({}) => {
  return (
    <Layout title="Reviews">
      <StoreReviewsList />
    </Layout>
  );
};

// подключаем редакс к getStaticProps при помощи wrapper

export const getStaticProps: GetStaticProps<StoreReviewsProps> =
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

    return {
      props: { forCustomers, categoryProduct, productType },
      revalidate: 10,
    };
  });

interface StoreReviewsProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
}

export default StoreReviewsPage;
