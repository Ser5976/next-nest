import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { IProduct } from '../../../components/page-components/Home/home.service';
import ProductPage from '../../../components/page-components/Product-Page/ProductPage';
import { ProductsService } from '../../../components/page-components/Products/products.service';
import { HeaderService } from '../../../header-service/header.service';
import { Layout } from '../../../Layout/Layout';
import { getCategoryProduct } from '../../../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../../../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../../../store/customers/customersSlice';
import { IArticle } from '../../../store/customers/interface.customers';
import { wrapper } from '../../../store/store';
import { getProductType } from '../../../store/type-product/catecoryProductSlice';
import { IType } from '../../../store/type-product/interface.typeProduct';

const ProductId = ({ product, productType }: ProductIdProps) => {
  console.log('Товар:', product);
  const router = useRouter();

  return (
    <Layout title="Product page">
      {router.isFallback ? (
        <h1 className=" text-center mt-5">Идёт загрузка...</h1>
      ) : Object.keys(product).length ? (
        <ProductPage product={product} productType={productType} />
      ) : (
        <h1 className=" text-center mt-5 font-semibold text-red-600">
          Что то пошло не так
        </h1>
      )}
    </Layout>
  );
};

// прописываем пути(ключи в объекте params это то, что в квадратных скобках,)
export const getStaticPaths = async () => {
  const allProducts = await ProductsService.getAllProducts(); //кастомный сервис для запроса  выбранного товара
  //здесь ограничили количества типов(берём только 1) т.к. fallback: true, остальные будут подгружаться сами
  // это чтобы при сборке небыло дахера страниц(будет долго загружаться)
  const paths = allProducts.slice(0, 1).map((type) => {
    return { params: { productId: type._id } };
  });
  return {
    paths: paths,
    fallback: true, //это для того ,чтобы подгружались новые динамические пути
  };
};

// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<ProductIdProps> =
  wrapper.getStaticProps((store) => async (ctx) => {
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
    //------------------------ получение выбранного товара ----------------------------------//
    const product = await ProductsService.getProduct(params?.productId);
    return {
      props: { forCustomers, categoryProduct, productType, product },
      revalidate: 10,
    };
  });

interface ProductIdProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  product: IProduct;
}

export default ProductId;
