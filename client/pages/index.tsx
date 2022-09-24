import type { GetStaticProps, NextPage } from 'next';
import Home from '../components/page-components/Home/Home';
import { HomeServise } from '../components/page-components/Home/home.service';
import { INews } from '../components/page-components/News-List/NewsList.props';
import { IStoreReviews } from '../components/page-components/StoreReviews-List/StoreReviewsList.props';
import { ISlider } from '../components/ui/Slider/Slider.props';
import { HeaderService } from '../header-service/header.service';
import { Layout } from '../Layout/Layout';
import { getCategoryProduct } from '../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../store/customers/customersSlice';
import { IArticle } from '../store/customers/interface.customers';
import { wrapper } from '../store/store';
import { getProductType } from '../store/type-product/catecoryProductSlice';
import { IType } from '../store/type-product/interface.typeProduct';

const HomePage: NextPage<HomeProps> = ({ news, reviews, sliders }) => {
  console.log('reviews:', reviews);
  console.log('news:', news);
  return (
    <Layout title="Home page" description="Тренировочный проект eCommerce">
      <Home news={news} reviews={reviews} sliders={sliders} />
    </Layout>
  );
};

// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<HomeProps> = wrapper.getStaticProps(
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

    //------------- данные для Home ---------------------------------//
    //новости
    const news = await HomeServise.getNews(); // кастомный сервис для запроса новостей
    //отзывы
    const reviews = await HomeServise.getReviews(); //кастомный сервис для запроса отзывов
    // слайдер
    const sliders = await HomeServise.getSlider(); //кастомный сервис для запроса слайдер

    return {
      props: {
        forCustomers,
        categoryProduct,
        productType,
        news,
        reviews,
        sliders,
      },
    };
  }
);

interface HomeProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  news: INews[];
  reviews: IStoreReviews[];
  sliders: ISlider[];
}

export default HomePage;
