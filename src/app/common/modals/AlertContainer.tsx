import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../stores/store';

export default observer(() => {
  const { modalStore } = useStore();

  const CsmAlert = React.forwardRef<HTMLDivElement, AlertProps>(
    (props, ref) => (
      <MuiAlert
        elevation={6}
        ref={ref}
        variant="standard"
        {...props}
        sx={{ borderRadius: '15px' }}
      />
    ),
  );

  return (
    <Snackbar
      open={modalStore.msgBar}
      onClose={modalStore.closeMsgBar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <CsmAlert
        onClose={modalStore.closeMsgBar}
        severity="error"
        sx={{ width: '100%' }}
      >
        This is a success message!
      </CsmAlert>
    </Snackbar>
  );
});
