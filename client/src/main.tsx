import '@mantine/core/styles.css';

import { createTheme, localStorageColorSchemeManager, MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './pages/home';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'globevision-color-scheme',
});

const theme = createTheme({});

const Layout = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme={'auto'} colorSchemeManager={colorSchemeManager} withCssVariables>
      <Home />
    </MantineProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
);
