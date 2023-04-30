import { GetStaticProps } from 'next';
import React from 'react';
import ReviewsPage from '../../components/page-components/User/Reviews/ReviewsPage';
import { HeaderService } from '../../header-service/header.service';
import { Layout } from '../../Layout/Layout';
import { NextPageAuth } from '../../providers/auth/auth.types';
import { getCategoryProduct } from '../../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../../store/customers/customersSlice';
import { IArticle } from '../../store/customers/interface.customers';
import { wrapper } from '../../store/store';
import { getProductType } from '../../store/type-product/catecoryProductSlice';
import { IType } from '../../store/type-product/interface.typeProduct';

const Reviews:NextPageAuth<ReviewsProps> = () => {
  return (
    <Layout title="User-page">
      <ReviewsPage />
    </Layout>
  );
};
Reviews.isOnlyUser = true; //только для авторизованных

// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<ReviewsProps> =
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

interface ReviewsProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
}

export default Reviews;
