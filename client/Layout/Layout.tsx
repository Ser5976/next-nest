import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { LayoutProps } from './Layout.props';
import Head from 'next/head';
import { FC } from 'react';

export const Layout: FC<LayoutProps> = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title}-Nest-Next` : 'Nest-Next'}</title>
        <meta name="description" content={description ? description : ''} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="  flex min-h-screen flex-col">
        <Header />
        <main className=" grow ">{children}</main>
        <Footer />
      </div>
    </>
  );
};
