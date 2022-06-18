/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CogAuthLogin } from '../../models/CogAuth';

interface AuthState {
  isLoggedIn: boolean;
  isAuthing: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isAuthing: false,
};

const authSlice = createSlice({
  name: 'authStore',
  initialState,
  reducers: {
    InvokeSignIn(state, action: PayloadAction<CogAuthLogin>) {
      state.isAuthing = true;
    },
    SignInSucceeded(state) {
      state.isAuthing = false;
      state.isLoggedIn = true;
    },
    SignInFailed(state) {
      state.isAuthing = false;
      state.isLoggedIn = false;
    },
    InvokeSignOut(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { InvokeSignIn, SignInSucceeded, SignInFailed, InvokeSignOut } = authSlice.actions;
export default authSlice.reducer;
