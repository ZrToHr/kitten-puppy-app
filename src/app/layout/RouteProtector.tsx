import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useStore } from '../stores/store';

interface Props {
  children: JSX.Element;
}

export default function RouteProtector({ children }: Props) {
  const {
    authStore: { isLoggedIn },
  } = useStore();

  const location = useLocation;

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
