import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';

export default function AlertContainer() {
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

  const {
    open: isOpen,
    message,
    type,
  } = useAppSelector((state) => state.snackbar);

  const dispatch = useAppDispatch();

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <CsmAlert severity="error" sx={{ width: '100%' }}>
        This is a success message!
      </CsmAlert>
    </Snackbar>
  );
}
