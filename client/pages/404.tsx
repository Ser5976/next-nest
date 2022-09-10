import axios from 'axios';
import { GetStaticProps } from 'next';
import React from 'react';
import { API } from '../constants/url';
import { Layout } from '../Layout/Layout';
import { getCategoryProduct } from '../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../store/customers/customersSlice';
import { IArticle } from '../store/customers/interface.customers';
import { wrapper } from '../store/store';
import { getProductType } from '../store/type-product/catecoryProductSlice';
import { IType } from '../store/type-product/interface.typeProduct';

const ErrorPage = () => {
  return (
    <Layout title="Error">
      <h1 className=" text-lg font-bold text-center mt-10">Not Found</h1>
    </Layout>
  );
};

// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<ErrorProps> =
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
      return { props: { forCustomers, categoryProduct, productType } };
    } catch (error) {
      return {
        props: {
          forCustomers: [],
          categoryProduct: [],
          productType: [],
        },
      };
    }
  });

interface ErrorProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
}

export default ErrorPage;
