import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React from 'react';

type LoadingBtnProps<T> = Partial<T> & { loading: boolean };

export default function CsmLoadingBtn(props: LoadingBtnProps<ButtonProps>) {
  const { loading, ...orgProps } = props;
  orgProps.disabled = loading;
  return (
    <Button {...orgProps}>
      {loading && (
        <CircularProgress
          color="inherit"
          size={16}
          sx={{ marginRight: '8px' }}
        />
      )}
      {orgProps.children}
    </Button>
  );
}
