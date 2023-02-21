import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { IBrand } from '../../../components/page-components/Admin/admin.service';
import { HeaderService } from '../../../header-service/header.service';
import { Layout } from '../../../Layout/Layout';
import { NextPageAuth } from '../../../providers/auth/auth.types';
import { getCategoryProduct } from '../../../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../../../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../../../store/customers/customersSlice';
import { IArticle } from '../../../store/customers/interface.customers';
import { wrapper } from '../../../store/store';
import { getProductType } from '../../../store/type-product/catecoryProductSlice';
import { IType } from '../../../store/type-product/interface.typeProduct';

const Products = dynamic(
  () => import('../../../components/page-components/Admin/Products/Products'),
  { ssr: false }
);

const AdminProductsPage: NextPageAuth<AdminProductsProps> = ({
  categoryProduct,
  productType,
  brands,
}) => {
  return (
    <Layout title="Адин панель">
      <Products
        categoryProduct={categoryProduct}
        brands={brands}
        productType={productType}
      />
    </Layout>
  );
};

AdminProductsPage.isOnlyAdmin = true; //только для админа

// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<AdminProductsProps> =
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
    //----------- получение брэндов --------------------------------//
    const brands = await HeaderService.getStaticBrand(); //кастомный сервис для запроса  брэндов

    return {
      props: { forCustomers, categoryProduct, productType, brands },
      revalidate: 10,
    };
  });

interface AdminProductsProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
  brands: IBrand[];
}

export default AdminProductsPage;
