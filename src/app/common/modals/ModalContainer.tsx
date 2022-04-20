import { Dialog, DialogContent } from '@mui/material';
import { styled } from '@mui/system';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../stores/store';

export default observer(() => {
  const { modalStore } = useStore();
  const StyledDialog = styled(Dialog)`
    & > .MuiDialog-container > .MuiPaper-root {
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(12px);
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 30px;
    }
  `;
  return (
    <StyledDialog
      hideBackdrop
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}
    >
      <DialogContent>{modalStore.modal.body}</DialogContent>
    </StyledDialog>
  );
});
