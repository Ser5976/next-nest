import axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { IStoreReviews } from '../../components/page-components/StoreReviews-List/StoreReviewsList.props';
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
const StoreReviewsList = dynamic(
  () =>
    import(
      '../../components/page-components/StoreReviews-List/StoreReviewsList'
    ),
  { ssr: false }
);

const StoreReviewsPage: NextPage<StoreReviewsProps> = ({ reviews }) => {
  return (
    <Layout title="News">
      {reviews.length === 0 ? (
        <h1 className=" text-center text-base mt-5">Данных нет!!!</h1>
      ) : (
        <StoreReviewsList reviews={reviews} />
      )}
    </Layout>
  );
};

// подключаем редакс к getStaticProps при помощи wrapper

export const getStaticProps: GetStaticProps<StoreReviewsProps> =
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
      const { data: reviews } = await axios.get<IStoreReviews[]>(
        API.storeReviews
      );

      return { props: { forCustomers, categoryProduct, productType, reviews } };
    } catch (error) {
      return {
        props: {
          forCustomers: [],
          categoryProduct: [],
          productType: [],
          reviews: [],
        },
      };
    }
  });

interface StoreReviewsProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  reviews: IStoreReviews[];
}

export default StoreReviewsPage;
