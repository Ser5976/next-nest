import axios from 'axios';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/Button/Button';
import { API } from '../constants/url';
import { Layout } from '../Layout/Layout';
import { IUser } from '../store/auth/interface.auth';
import { getCategoryProduct } from '../store/category-product/catecoryProductSlice';
import { ICategoryProduct } from '../store/category-product/interface.categoryProduct';
import { getForCustomers } from '../store/customers/customersSlice';
import { IArticle } from '../store/customers/interface.customers';

import { wrapper } from '../store/store';
import { getProductType } from '../store/type-product/catecoryProductSlice';
import { IType } from '../store/type-product/interface.typeProduct';
import { useData } from '../store/useData';

const por = {
  user: {
    _id: 'nxkd,c',
    email: 'nncmkd,c',
    isAdmin: true,
  },
  refreshToken: 'jhnkjcndm',
  accessToken: 'jsxndkjc',
};

const Home: NextPage<HomeProps> = (props) => {
  // console.log(props.category);
  const { authReducer } = useData();
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    setUser(authReducer.user);
  }, [authReducer.user]);

  return (
    <Layout title="Home page" description="Тренировочный проект eCommerce">
      <div className=" min-h-screen">
        <main className="p-10 grow ">
          <h1 className="text-lg font-semibold ">Начало!</h1>
        </main>

        <Link href="/profile">
          <a>Профайл</a>
        </Link>
        <Link href="/admin">
          <a>Админ</a>
        </Link>
        <button
          onClick={() => {
            toast.error('Привет приятель');
          }}
        >
          Toastr Success
        </button>
        <Button>Образец</Button>
        <Button apperance="small">Образец</Button>
      </div>
    </Layout>
  );
};

// подключаем редакс к getStaticProps при помощи wrapper
export const getStaticProps: GetStaticProps<HomeProps> = wrapper.getStaticProps(
  (store) => async () => {
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
  }
);

interface HomeProps {
  forCustomers: IArticle[];
  categoryProduct: ICategoryProduct[];
  productType: IType[];
}

export default Home;
