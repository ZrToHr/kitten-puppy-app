/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  open: boolean;
  signInOpen: boolean;
  signUpOpen: boolean;
}

const initialState: ModalState = {
  open: false,
  signInOpen: false,
  signUpOpen: false,
};

const modalSlice = createSlice({
  name: 'modalStore',
  initialState,
  reducers: {
    openSignIn(state) {
      state.open = true;
      state.signInOpen = true;
      state.signUpOpen = false;
    },
    openSignUp(state) {
      state.open = true;
      state.signInOpen = false;
      state.signUpOpen = true;
    },
    closeModal(state) {
      state.open = false;
      state.signInOpen = false;
      state.signUpOpen = false;
    },
  },
});

export const { openSignIn, openSignUp, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
