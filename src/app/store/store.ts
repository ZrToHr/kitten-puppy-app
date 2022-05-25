import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import modalSlice from '../common/modal/modal-slice';
import snackbarSlice from '../common/snackbar/snackbar-slice';
import authSlice from '../features/auth/auth-slice';
import { StateLogger } from './middleware/stateLogger';

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    auth: authSlice,
    snackbar: snackbarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(StateLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
