import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StoreProvider } from '../store/StoreContext';
import { getStores } from '../store';
import BeforeUnload from '../components/BeforeUnload';

export default function App({ Component, pageProps }: AppProps) {
  return <StoreProvider value={getStores()}>
    <BeforeUnload />
    <Component {...pageProps} />
  </StoreProvider>
}
