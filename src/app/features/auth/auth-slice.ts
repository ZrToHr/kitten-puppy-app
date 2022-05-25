/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'authStore',
  initialState,
  reducers: {
    signIn(state) {
      state.isLoggedIn = true;
    },
    signOut(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
