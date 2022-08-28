import axios from 'axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/Button/Button';
import { Layout } from '../Layout/Layout';
import { example, selectProfile } from '../store/exampleSlice';
import { wrapper } from '../store/store';

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
  const auth = useSelector(selectProfile);

  return (
    <Layout title="Home page" description="Тренировочный проект eCommerce">
      <div className=" min-h-screen">
        <main className="p-10 grow ">
          <h1 className="text-lg font-semibold ">Начало!</h1>
        </main>
        <h1 className=" text-lg"> Токен:{auth.authData.refreshToken}</h1>
        <Link href="/primer">
          <a>Пример</a>
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
