import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../store/store-hooks';

export default function AlertContainer() {
  const CsmAlert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="standard" {...props} sx={{ borderRadius: '15px' }} />
  ));

  const { open: isOpen, message, type } = useAppSelector((state) => state.snackbar);

  return (
    <Snackbar open={isOpen} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <CsmAlert severity={type} sx={{ width: '100%' }}>
        {message}
      </CsmAlert>
    </Snackbar>
  );
}
