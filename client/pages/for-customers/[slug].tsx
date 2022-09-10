import axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Article from '../../components/page-components/Article/Article';
import { API } from '../../constants/url';
import { Layout } from '../../Layout/Layout';
import { getCategoryProduct } from '../../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../../store/customers/customersSlice';
import { IArticle } from '../../store/customers/interface.customers';
import { wrapper } from '../../store/store';
import { getProductType } from '../../store/type-product/catecoryProductSlice';
import { IType } from '../../store/type-product/interface.typeProduct';

const ForCustomers: NextPage<ForCustomersProps> = ({ article }) => {
  const router = useRouter();

  return (
    <Layout title="For customers">
      {/* это из-за fallback: true,если не сделать услувие, build покажеть ошибку */}
      {router.isFallback ? (
        <h1>Идёт загрузка...</h1>
      ) : (
        <Article article={article} />
      )}
    </Layout>
  );
};
// прописываем пути
export const getStaticPaths = async () => {
  const { data: forCustomers } = await axios.get<IArticle[]>(API.customers);
  const paths = forCustomers.map((article) => {
    return { params: { slug: article.slug } };
  });
  return {
    paths: paths,
    fallback: true, //это для того ,чтобы подгружались новые динамические пути
  };
};
// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<ForCustomersProps> =
  wrapper.getStaticProps((store) => async (cxt) => {
    const { params } = cxt;

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
      const { data: article } = await axios.get<IArticle>(
        `${API.customers}/${params?.slug}`
      );

      return { props: { forCustomers, categoryProduct, productType, article } };
    } catch (error) {
      return {
        props: {
          forCustomers: [],
          categoryProduct: [],
          productType: [],
          article: {} as IArticle,
        },
      };
    }
  });

interface ForCustomersProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  article: IArticle;
}

export default ForCustomers;
