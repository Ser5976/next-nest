import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Layout } from '../Layout/Layout';
import { authorization, selectProfile } from '../store/reducers/authSlice';
import { wrapper } from '../store/store';

const Primer: NextPage = () => {
  const auth = useSelector(selectProfile);
  const rout = useRouter();

  /* const funs = async () => {
    const { data: category } = await axios.get<any>(
      `${process.env.NEXT_PUBLIC_DOMAIN}`
    );

    console.log(category);
  };
  useEffect(() => {
    funs();
  }, []);
 */
  return (
    <Layout title="Home page" description="Тренировочный проект eCommerce">
      <h1 className=" text-lg font-bold">
        {' '}
        Токен: {auth.authData.refreshToken}
      </h1>
    </Layout>
  );
};

export default Primer;
