import axios from 'axios';
import { GetStaticProps } from 'next';
import React from 'react';
import { API } from '../../constants/url';
import { Layout } from '../../Layout/Layout';
import { NextPageAuth } from '../../providers/auth/auth.types';
import { getForCustomers } from '../../store/customers/customersSlice';
import { IArticle } from '../../store/customers/interface.customers';
import { wrapper } from '../../store/store';

const AdminPage: NextPageAuth = () => {
  return (
    <Layout title="Адин панель">
      <div>AdminPage</div>
    </Layout>
  );
};

AdminPage.isOnlyAdmin = true; //только для админа

// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<AdminProps> =
  wrapper.getStaticProps((store) => async () => {
    try {
      //получение ForCustomers (для клиентов)
      const { data } = await axios.get<IArticle[]>(API.customers);
      // отправляем данные в редакс
      store.dispatch(getForCustomers(data));

      return { props: { forCustomers: data } };
    } catch (error) {
      return {
        props: {
          forCustomers: [],
        },
      };
    }
  });

interface AdminProps {
  forCustomers: IArticle[];
}

export default AdminPage;
