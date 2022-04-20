import { InputBase, InputBaseProps, styled, Typography } from '@mui/material';
import { ErrorMessage, useField } from 'formik';
import React from 'react';

type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

const StyledInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 15,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    border: 'none',
    boxShadow: '0px 30px 30px rgba(69, 42, 124, 0.15)',

    fontSize: '0.875rem',
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      // borderColor: theme.palette.primary.main,
    },
  },
}));

export default function CsmFormField(
  props: RequiredBy<InputBaseProps, 'name'>,
) {
  const { name } = props;
  const [field, meta] = useField(name);
  return (
    <div>
      <StyledInput {...field} {...props} />
      <ErrorMessage name={name}>
        {(msg) => (
          <Typography
            variant="subtext"
            sx={{ color: '#D0BAD2', paddingTop: '4px' }}
          >
            {msg}
          </Typography>
        )}
      </ErrorMessage>
    </div>
  );
}
