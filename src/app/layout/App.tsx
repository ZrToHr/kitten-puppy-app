import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageHighlights from '../features/highlights/ManageHighlights';
import UploadHighlights from '../features/highlights/UploadHighlights';
import ViewHighlights from '../features/highlights/ViewHighlights';
import HomePage from '../features/home/HomePage';
import { useStore } from '../stores/store';
import RouteProtector from './RouteProtector';

function App() {
  const { authStore } = useStore();

  useEffect(() => {
    console.log('check user islogged in before rendering the app');
    authStore.checkAuth();
  }, [authStore]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route
        path="/manage"
        element={
          <RouteProtector>
            <ManageHighlights />
          </RouteProtector>
        }
      />
      <Route
        path="/upload"
        element={
          <RouteProtector>
            <UploadHighlights />
          </RouteProtector>
        }
      />
      <Route path="*" element={<ViewHighlights />} /> */}
    </Routes>
  );
}

export default App;
