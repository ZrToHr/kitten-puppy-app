import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../store/store-hooks';

interface Props {
  children: JSX.Element;
}

export default function RouteProtector({ children }: Props) {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}
