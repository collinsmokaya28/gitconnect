import type { AppProps } from 'next/app';
import { AppwriteProvider } from '../context/AppwriteContext'; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppwriteProvider>
      <Component {...pageProps} />
    </AppwriteProvider>
  );
}

export default MyApp;
