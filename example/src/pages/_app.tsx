import { INestNextApp, getNestNextInitialProps } from 'nest-next-spa';
import Head from 'next/head';

const App: INestNextApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
        <style>{pageProps.style}</style>
      </Head>
      <Component pageProps={pageProps} />
    </>
  );
};

export default App;

App.getInitialProps = getNestNextInitialProps(() => ({
  pageProps: {
    title: 'Initial Title',
    style: '',
  },
}));

