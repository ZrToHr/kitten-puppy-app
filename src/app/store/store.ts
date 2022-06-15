import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import modalSlice from '../common/modal/modal-slice';
import snackbarSlice from '../common/snackbar/snackbar-slice';
import authSlice from '../features/auth/auth-slice';
import rootSage from './middleware/RootSaga';

const sageMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    auth: authSlice,
    snackbar: snackbarSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sageMiddleware),
});

sageMiddleware.run(rootSage);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
