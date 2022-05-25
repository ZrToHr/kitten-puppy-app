/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  open: boolean;
  body: JSX.Element | null;
}

const initialState: ModalState = {
  open: false,
  body: null,
};

const modalSlice = createSlice({
  name: 'modalStore',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<JSX.Element>) {
      state.open = true;
      state.body = action.payload;
    },
    closeModal(state) {
      state.open = false;
      state.body = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
