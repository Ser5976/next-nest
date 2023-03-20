import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { ProductsService } from '../../components/page-components/Products/products.service';
import { IPoster } from '../../components/page-components/Products/ProductsList.props';
import { HeaderService } from '../../header-service/header.service';
import { Layout } from '../../Layout/Layout';
import { getCategoryProduct } from '../../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../../store/customers/customersSlice';
import { IArticle } from '../../store/customers/interface.customers';
import { wrapper } from '../../store/store';
import { getProductType } from '../../store/type-product/catecoryProductSlice';
import { IType } from '../../store/type-product/interface.typeProduct';

// данные и пагинация рендерится на клиенте

// динамический роут из за window.location
const ProductsList = dynamic(
  () => import('../../components/page-components/Products/ProductsList'),
  { ssr: false }
);

const Products: NextPage<ProductsProps> = ({
  type, //данные по типу
  poster, //картинка и текст для страницы с типом товаров
}) => {
  return (
    <Layout title=" Products" description="Тренировочный проект eCommerce">
      <div>
        <ProductsList poster={poster} type={type} />
      </div>
    </Layout>
  );
};
// прописываем пути(ключи в объекте params это то, что в квадратных скобках,)
export const getStaticPaths = async () => {
  const productType = await HeaderService.getProductType(); //кастомный сервис для запроса  типов продуктов
  //здесь ограничили количества типов(берём только 11) т.к. fallback: true, остальные будут подгружаться сами
  // это чтобы при сборке небыло дахера страниц(будет долго загружаться)
  const paths = productType.slice(0, 12).map((type) => {
    return { params: { typeId: type._id } };
  });
  return {
    paths: paths,
    fallback: true, //это для того ,чтобы подгружались новые динамические пути
  };
};

// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<ProductsProps> =
  wrapper.getStaticProps((store) => async (ctx) => {
    // console.log('контекст', ctx);
    const { params } = ctx;
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
    //---------- получение для типа товаров---------------//
    //получение постера
    const poster = await ProductsService.getPosterType(params?.typeId);
    //получение выбранного типа товара
    const type = await ProductsService.getType(params?.typeId);

    return {
      props: {
        forCustomers,
        categoryProduct,
        productType,
        type,
        poster,
      },
      revalidate: 10,
    };
  });

interface ProductsProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  type: IType;
  poster: IPoster | null;
}

export default Products;
