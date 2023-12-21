import '@mantine/core/styles.css';
import './index.css';

import { createTheme, localStorageColorSchemeManager,MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'globevision-color-scheme',
});

const theme = createTheme({});

const Layout = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme={'auto'} colorSchemeManager={colorSchemeManager} withCssVariables>
      <App />
    </MantineProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
);
