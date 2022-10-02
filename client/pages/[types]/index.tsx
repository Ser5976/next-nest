import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import ProductTypes from '../../components/page-components/Product-Types/ProductTypes';
import { IFilteredProduct } from '../../components/page-components/Product-Types/ProductTypes.props';
import { ProductTypesService } from '../../components/page-components/Product-Types/productTypes.service';
import Pagination from '../../components/ui/Pagination/Pagination';
import { HeaderService } from '../../header-service/header.service';
import { Layout } from '../../Layout/Layout';
import { getCategoryProduct } from '../../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../../store/customers/customersSlice';
import { IArticle } from '../../store/customers/interface.customers';
import { wrapper } from '../../store/store';
import { getProductType } from '../../store/type-product/catecoryProductSlice';
import { IType } from '../../store/type-product/interface.typeProduct';

const ProductTypesPage: NextPage<ProductTypesProps> = ({
  product, //объект с массивом продуктов, количеством продуктов,количеством страниц
  productType, // массив типов товара
  type, //id типа товара, выбранного из адресной строки
}) => {
  //console.log(product);
  const router = useRouter();
  console.log(router);
  return (
    <Layout
      title=" Product types page"
      description="Тренировочный проект eCommerce"
    >
      {/* это из-за fallback: true,если не сделать условие, build покажеть ошибку */}
      {router.isFallback ? (
        <h1>Идёт загрузка...</h1>
      ) : (
        <>
          <ProductTypes
            product={product}
            type={type}
            productType={productType}
          />
          <Pagination
            count={product.count}
            type={type}
            pageQty={product.pageQty}
            selectedPath="page"
          />
        </>
      )}
    </Layout>
  );
};

// прописываем пути(ключи в объекте params это то, что в квадратных скобках,)
export const getStaticPaths = async () => {
  const productType = await HeaderService.getProductType(); //кастомный сервис для запроса  типов продуктов
  //здесь ограничили количества типов(берём только 1) т.к. fallback: true, остальные будут подгружаться сами
  // это чтобы при сборке небыло дахера страниц(будет долго загружаться)
  const paths = productType.slice(0, 1).map((type) => {
    return { params: { types: type._id } };
  });
  return {
    paths: paths,
    fallback: true, //это для того ,чтобы подгружались новые динамические пути
  };
};

const limit = 1;
// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<ProductTypesProps> =
  wrapper.getStaticProps((store) => async (ctx) => {
    const { params } = ctx;
    // вычисляем из запроса номер страницы ,если нет то 1
    const page = params?.page ? params?.page : '1';
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

    //------------- данные для ProductTypesPage ---------------------------------//
    const product = await ProductTypesService.getProduct(
      params?.types,
      page,
      limit
    );

    return {
      props: {
        forCustomers,
        categoryProduct,
        productType,
        product,
        type: params?.types,
      },
      revalidate: 10,
    };
  });

interface ProductTypesProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  product: IFilteredProduct;
  type: string | string[] | undefined;
}

export default ProductTypesPage;
