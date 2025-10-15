import { useEffect, useState } from 'react';
import AOS from 'aos';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { LayoutProvider } from '@hooks/useContext';

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { appWithTranslation } from 'next-i18next';
import NiceModal from '@ebay/nice-modal-react';
import { GlobalStyle } from '@ui/global-style';
import { ToastContainer } from 'react-toastify';
import 'aos/dist/aos.css';
import lightmode from '../theme/lightmode';
import darkmode from '../theme/darkmode';
import './fonts.css';
import './react-multi-email-style-override.css';
import 'react-toastify/dist/ReactToastify.css';
import './toast-container-style-override.css';

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [theme, setTheme] = useState(lightmode);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <ThemeProvider theme={{ ...theme, setTheme, lightmode, darkmode }}>
      <LayoutProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle theme={theme} />
          <Hydrate state={pageProps.dehydratedState}>
            <NiceModal.Provider>
              <ToastContainer />
              <Component {...pageProps} />
            </NiceModal.Provider>
          </Hydrate>
        </QueryClientProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
