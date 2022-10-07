import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';

import AuthState from './context/auth/authState';
import IndexState from './context/xray/indexState';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <AuthState>
      <IndexState>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {routing}
        </ThemeProvider>
      </IndexState>
    </AuthState>
  );
};

export default App;
