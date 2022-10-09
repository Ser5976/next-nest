import { FC } from 'react';
import { TypeComponentAuthFields } from './auth/auth.types';
import AuthProvider from './auth/AuthProvider';
import Toast from './toast/Toast';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const MainProvider: FC<TypeComponentAuthFields> = ({ children, Component }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toast />
      <AuthProvider Component={Component}>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default MainProvider;
