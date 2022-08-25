import { NextPage } from 'next';
import { Auth } from '../components/page-components/Auth/Auth';
import { Layout } from '../Layout/Layout';

const AuthPage: NextPage = () => {
  return (
    <Layout title="Auth page">
      <Auth />
    </Layout>
  );
};

export default AuthPage;
