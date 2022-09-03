import { FC } from 'react';
import { TypeComponentAuthFields } from './auth/auth.types';
import AuthProvider from './auth/AuthProvider';
import Toast from './toast/Toast';

const MainProvider: FC<TypeComponentAuthFields> = ({ children, Component }) => {
  return (
    <>
      <Toast />
      <AuthProvider Component={Component}>{children}</AuthProvider>
    </>
  );
};

export default MainProvider;
