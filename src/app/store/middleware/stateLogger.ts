import { Middleware } from '@reduxjs/toolkit';

export const StateLogger: Middleware = (storeApi) => (next) => (action) => {
  console.log('State Before: ', storeApi.getState());
  next(action);
  console.log('State After: ', storeApi.getState());
};
