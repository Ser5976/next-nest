import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import MainProvider from '../providers/MainProvider';
import NextNProgress from 'nextjs-progressbar'; //спинер
import { TypeComponentAuthFields } from '../providers/auth/auth.types';

type TypeAppProps = AppProps & TypeComponentAuthFields;

function MyApp({ Component, pageProps }: TypeAppProps) {
  return (
    <>
      <NextNProgress color="#ffa500" />
      <MainProvider Component={Component}>
        <Component {...pageProps} />
      </MainProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
