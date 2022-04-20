import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { theme } from '../../theme';
import ManageHighlights from '../features/highlights/ManageHighlights';
import UploadHighlights from '../features/highlights/UploadHighlights';
import ViewHighlights from '../features/highlights/ViewHighlights';
import HomePage from '../features/home/HomePage';
import { useStore } from '../stores/store';
import PrivateRoute from './PrivateRoute';

function App() {
  const { authStore } = useStore();
  useEffect(() => {
    console.log('check user islogged in before rendering the app');
    authStore.checkAuth();
  }, [authStore]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Route exact path="/" component={HomePage} />
      <Route
        path="/(.+)"
        render={() => (
          <Switch>
            <PrivateRoute exact path="/manage" component={ManageHighlights} />
            <PrivateRoute exact path="/upload" component={UploadHighlights} />
            <Route component={ViewHighlights} />
          </Switch>
        )}
      />
    </ThemeProvider>
  );
}

export default App;
