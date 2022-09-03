import axios from 'axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/Button/Button';
import { Layout } from '../Layout/Layout';
import { IUser } from '../store/auth/interface.auth';

import { wrapper } from '../store/store';
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

const Home: NextPage = () => {
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
        <h1 className=" text-lg"> Токен:{user?.email}</h1>
        <Link href="/abaut">
          <a>Пример</a>
        </Link>
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

/* export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(authorization(por));
    // console.log('env:', process.env.HOST_API);
    return {
      props: {
        por,
      },
    };
  }
); */

export default Home;
