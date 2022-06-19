import { Dialog, DialogContent } from '@mui/material';
import { styled } from '@mui/system';
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { closeModal } from './modal-slice';
import Login from '../../features/auth/Login';
import SignUp from '../../features/auth/SignUp';

export default function ModalContainer() {
  const StyledDialog = styled(Dialog)`
    & > .MuiDialog-container > .MuiPaper-root {
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(12px);
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 30px;
    }
  `;

  const { open: modalOpen, signInOpen, signUpOpen } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const onDialogClose = useCallback((event: object, reason: string) => {
    if (reason === 'backdropClick') return;
    dispatch(closeModal());
  }, []);

  return (
    <StyledDialog hideBackdrop open={modalOpen} onClose={onDialogClose}>
      <DialogContent>
        {signInOpen ? <Login /> : null}
        {signUpOpen ? <SignUp /> : null}
      </DialogContent>
    </StyledDialog>
  );
}
