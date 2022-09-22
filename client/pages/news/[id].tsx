import axios from 'axios';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NewsItem from '../../components/page-components/News-Item/NewsItem';
import { NewsItemService } from '../../components/page-components/News-Item/newsitem.service';
import { INews } from '../../components/page-components/News-List/NewsList.props';
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

const NewsProfile: NextPage<NewsProfileProps> = ({ news }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h1 className=" text-center mt-5">Идёт загрузка...</h1>;
  }

  return (
    <Layout title="News">
      <NewsItem news={news} />
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const { data: news } = await axios.get<INews[]>(API.news);
  const paths = news.slice(0, 3).map((p) => {
    //.slice обрезаем массив ,чтобы не загружать все пути.Это мы делаем когда у нас дахерища страниц ,чтобы build был быстрей
    // но fallback должен быть true,чтобы пути ,которых нет, погружались
    return {
      params: { id: p._id },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<NewsProfileProps> =
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
    const news = await NewsItemService.getNewsItem(params?.id); //кастомный сервис для запроса отдельной новости
    // console.log(news);
    return { props: { forCustomers, categoryProduct, productType, news } };
  });

interface NewsProfileProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  news: INews;
}

export default NewsProfile;
