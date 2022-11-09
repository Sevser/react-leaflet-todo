import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StoreProvider } from '../store/storeContext';
import { getStores } from '../store';

export default function App({ Component, pageProps }: AppProps) {
  return <StoreProvider value={getStores()}>
    <Component {...pageProps} />
  </StoreProvider>
}
