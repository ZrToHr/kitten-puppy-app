import {
  alpha,
  OutlinedInputProps,
  styled,
  TextField,
  TextFieldProps,
} from '@mui/material';
import React from 'react';

const ContainedTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    border: 'none',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&.Mui-focused': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function CsmTextField(props: TextFieldProps) {
  return <ContainedTextField {...props} />;
}
