import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { theme } from '../theme';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GlobalStyles } from '@eurovision-game-monorepo/core-ui';
import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
