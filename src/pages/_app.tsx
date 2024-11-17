import { AppProps } from 'next/app';
import { Layout } from '@/components/layout/Layout';
import { BusinessProvider } from '@/context/BusinessContext';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BusinessProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BusinessProvider>
  );
}

export default MyApp;
