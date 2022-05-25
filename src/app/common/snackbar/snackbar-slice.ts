/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum MessageType {
  Error,
  Warning,
}

interface SnackbarState {
  open: boolean;
  type: MessageType | null;
  message: string | null;
}

type RequiredNonNullableObject<T extends object> = {
  [P in keyof Required<T>]: NonNullable<T[P]>;
};

export type SnackbarPayload = RequiredNonNullableObject<
  Omit<SnackbarState, 'open'>
>;

const initialState: SnackbarState = {
  open: false,
  type: null,
  message: null,
};

const snackbarSlice = createSlice({
  name: 'snackbarState',
  initialState,
  reducers: {
    openSnackbar(state, action: PayloadAction<SnackbarPayload>) {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeSnackbar(state) {
      state.open = false;
      state.message = null;
      state.type = null;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
