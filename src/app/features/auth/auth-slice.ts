/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CogAuthLogin, CogAuthSignUp } from '../../models/CogAuth';

interface AuthState {
  isLoggedIn: boolean;
  isAuthing: boolean;
  albumId: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isAuthing: false,
  albumId: '',
};

const authSlice = createSlice({
  name: 'authStore',
  initialState,
  reducers: {
    InvokeSignIn(state, action: PayloadAction<CogAuthLogin>) {
      state.isAuthing = true;
    },
    SignInSucceeded(state, action: PayloadAction<string>) {
      state.isAuthing = false;
      state.isLoggedIn = true;
      state.albumId = action.payload;
    },
    SignInFailed(state) {
      state.isAuthing = false;
      state.isLoggedIn = false;
    },
    InvokeSignOut(state) {
      state.isLoggedIn = false;
      state.albumId = '';
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
    InvokeSignUpConfirmation(state, action: PayloadAction<string>) {
      state.isAuthing = true;
    },
    SignUpConfirmationSucceeded(state) {
      state.isAuthing = false;
    },
    SignUpConfirmationFailed(state) {
      state.isAuthing = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    CheckAuthentication(state) {},
    UserAuthenticated(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.albumId = action.payload;
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
  InvokeSignUpConfirmation,
  SignUpConfirmationSucceeded,
  SignUpConfirmationFailed,
  CheckAuthentication,
  UserAuthenticated,
} = authSlice.actions;
export default authSlice.reducer;
