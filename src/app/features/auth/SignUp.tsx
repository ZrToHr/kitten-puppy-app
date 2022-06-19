import React, { useCallback, useState } from 'react';
import { InputAdornment, Typography } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Stack from '@mui/material/Stack';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CsmFormField from '../../common/form/CsmFormField';
import CsmLoadingBtn from '../../common/button/CsmLoadingBtn';
import { BtnStyleOutline, StyledDivider } from '../../../theme';
import { CogAuthSignUp } from '../../models/CogAuth';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { openSignIn } from '../../common/modal/modal-slice';
import { InvokeSignUp } from './auth-slice';

export default function SignUp() {
  const validationSchema = Yup.object({
    username: Yup.string().required('username is required'),
    email: Yup.string().required('email address is required').email(),
    password: Yup.string()
      .required('password is required')
      .min(12, 'password must have at least 12 characters')
      .matches(/[0-9]+/, 'password must have one digit')
      .matches(/[!@#$%^&*)(+=._-]+/, 'password must have one special character')
      .matches(/[a-z]+/, 'password must have one lower case')
      .matches(/[A-Z]+/, 'password must have one upper case'),
  });

  const credentials: CogAuthSignUp = {
    username: '',
    email: '',
    password: '',
  };

  const dispatch = useAppDispatch();

  const { isAuthing: isSubmitting } = useAppSelector((state) => state.auth);

  const onSignInSwitch = useCallback(() => {
    dispatch(openSignIn());
  }, []);

  const onSignUpSubmit = useCallback((values: CogAuthSignUp) => {
    dispatch(InvokeSignUp(values));
  }, []);

  return (
    <>
      <Typography variant="title">Sign Up</Typography>
      <Typography variant="subtext">
        Register your account with your email. Note your password must contain at least 8 characters.
      </Typography>

      <Formik validationSchema={validationSchema} initialValues={credentials} onSubmit={onSignUpSubmit}>
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Stack spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
              <CsmFormField
                fullWidth
                name="username"
                startAdornment={
                  <InputAdornment position="start">
                    <PersonOutlinedIcon />
                  </InputAdornment>
                }
              />

              <CsmFormField
                fullWidth
                name="email"
                startAdornment={
                  <InputAdornment position="start">
                    <MailOutlinedIcon />
                  </InputAdornment>
                }
              />

              <CsmFormField
                fullWidth
                name="password"
                type="password"
                startAdornment={
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                }
              />

              <CsmLoadingBtn fullWidth sx={BtnStyleOutline} variant="contained" type="submit" loading={isSubmitting}>
                Sign Up
              </CsmLoadingBtn>
            </Stack>
          </Form>
        )}
      </Formik>

      <Typography variant="subtext">
        By clicking on Sign Up, you agree to our Terms of service and Privacy policy.
      </Typography>

      <StyledDivider variant="middle" />

      <Typography variant="subtext">
        Already have an account?
        <Typography
          variant="subtext"
          sx={{ fontWeight: 'bold', display: 'inline', cursor: 'pointer' }}
          onClick={onSignInSwitch}
        >
          &nbsp; Sign In
        </Typography>
      </Typography>
    </>
  );
}
