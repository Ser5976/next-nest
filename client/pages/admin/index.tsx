import React from 'react';
import { Layout } from '../../Layout/Layout';
import { NextPageAuth } from '../../providers/auth/auth.types';

const AdminPage: NextPageAuth = () => {
  return (
    <Layout title="Адин панель">
      <div>AdminPage</div>
    </Layout>
  );
};

AdminPage.isOnlyAdmin = true; //только для админа

export default AdminPage;
