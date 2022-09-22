import axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Article from '../../components/page-components/Article/Article';
import { ArticleService } from '../../components/page-components/Article/article.service';
import { API } from '../../constants/url';
import { HeaderService } from '../../header-service/header.service';
import { Layout } from '../../Layout/Layout';
import { getCategoryProduct } from '../../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../../store/customers/customersSlice';
import { IArticle } from '../../store/customers/interface.customers';
import { wrapper } from '../../store/store';
import { getProductType } from '../../store/type-product/catecoryProductSlice';
import { IType } from '../../store/type-product/interface.typeProduct';

const ForCustomers: NextPage<ForCustomersProps> = ({
  article,
  forCustomers,
}) => {
  const router = useRouter();

  return (
    <Layout title="For customers">
      {/* это из-за fallback: true,если не сделать услувие, build покажеть ошибку */}
      {router.isFallback ? (
        <h1>Идёт загрузка...</h1>
      ) : forCustomers.length === 0 ? (
        <h1 className="text-center text-base mt-5">Нет данных!!!</h1>
      ) : (
        <Article article={article} forCustomers={forCustomers} />
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

    const article = await ArticleService.getArticle(params?.slug); //кастомный сервис для запроса   станиц для клиентов

    return { props: { forCustomers, categoryProduct, productType, article } };
  });

interface ForCustomersProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  article: IArticle;
}

export default ForCustomers;
