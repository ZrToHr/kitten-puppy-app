import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageHighlights from '../features/highlights/ManageHighlights';
import UploadHighlights from '../features/highlights/UploadHighlights';
import GalleryView from '../features/highlights/GalleryView';
import HomePage from '../features/home/HomePage';
import RouteProtector from './RouteProtector';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
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
      <Route path="*" element={<GalleryView />} />
    </Routes>
  );
}

export default App;
