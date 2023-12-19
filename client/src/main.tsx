import '@mantine/core/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';
import './index.css';
import { MantineProvider, createTheme, localStorageColorSchemeManager } from '@mantine/core';

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
