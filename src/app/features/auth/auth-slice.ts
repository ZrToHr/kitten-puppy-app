/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CogAuthLogin, CogAuthSignUp } from '../../models/CogAuth';

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
    InvokeSignUp(state, action: PayloadAction<CogAuthSignUp>) {
      state.isAuthing = true;
    },
    SignUpSucceeded(state) {
      state.isAuthing = false;
    },
    SignUpFailed(state) {
      state.isAuthing = false;
    },
  },
});

export const {
  InvokeSignIn,
  SignInSucceeded,
  SignInFailed,
  InvokeSignOut,
  InvokeSignUp,
  SignUpSucceeded,
  SignUpFailed,
} = authSlice.actions;
export default authSlice.reducer;
