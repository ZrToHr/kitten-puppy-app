import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store/store';
import { theme } from './theme';
import AlertContainer from './app/common/snackbar/AlertContainer';
import { BrowserRouterWithHistory } from './app/layout/BrowserRouterWithHistory';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export const history = createBrowserHistory();

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertContainer />
      <BrowserRouterWithHistory history={history}>
        <App />
      </BrowserRouterWithHistory>
    </ThemeProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
