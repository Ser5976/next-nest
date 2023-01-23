import { FC } from 'react';
import { TypeComponentAuthFields } from './auth/auth.types';
import AuthProvider from './auth/AuthProvider';
import Toast from './toast/Toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

const MainProvider: FC<TypeComponentAuthFields> = ({ children, Component }) => {
  return (
    <QueryClientProvider client={queryClient} >
      <ReactQueryDevtools initialIsOpen={false}  />
      <Toast />
      <AuthProvider Component={Component}>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default MainProvider;
