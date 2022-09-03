import React from 'react';
import { Layout } from '../../Layout/Layout';
import { NextPageAuth } from '../../providers/auth/auth.types';

const ProfilePage: NextPageAuth = () => {
  return (
    <Layout title="Профиль">
      <div>ProfilePage</div>
    </Layout>
  );
};
ProfilePage.isOnlyUser = true; //только для авторизованных
export default ProfilePage;
