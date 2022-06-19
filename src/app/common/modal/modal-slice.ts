/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  open: boolean;
  signInOpen: boolean;
  signUpOpen: boolean;
  registrationConfirmOpen: boolean;
}

const initialState: ModalState = {
  open: false,
  signInOpen: false,
  signUpOpen: false,
  registrationConfirmOpen: false,
};

const modalSlice = createSlice({
  name: 'modalStore',
  initialState,
  reducers: {
    openSignIn(state) {
      state.open = true;
      state.signInOpen = true;
      state.signUpOpen = false;
      state.registrationConfirmOpen = false;
    },
    openSignUp(state) {
      state.open = true;
      state.signInOpen = false;
      state.signUpOpen = true;
      state.registrationConfirmOpen = false;
    },
    openRegistrationConfirm(state) {
      state.open = true;
      state.signInOpen = false;
      state.signUpOpen = false;
      state.registrationConfirmOpen = true;
    },
    closeModal(state) {
      state.open = false;
      state.signInOpen = false;
      state.signUpOpen = false;
      state.registrationConfirmOpen = false;
    },
  },
});

export const { openSignIn, openSignUp, openRegistrationConfirm, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
