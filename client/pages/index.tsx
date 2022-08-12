import type { NextPage } from 'next';
import { Layout } from '../Layout/Layout';

const Home: NextPage = () => {
  return (
    <Layout title="Home page">
      <main className="p-10 grow ">
        <h1 className="text-lg font-semibold ">Начало!</h1>
      </main>
    </Layout>
  );
};

export default Home;
