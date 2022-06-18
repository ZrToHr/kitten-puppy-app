import React, { useCallback, useState } from 'react';
import { InputAdornment, Typography } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Stack from '@mui/material/Stack';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Login from './Login';
import CsmFormField from '../../common/form/CsmFormField';
import CsmLoadingBtn from '../../common/button/CsmLoadingBtn';
import { BtnStyleOutline, StyledDivider } from '../../../theme';
import { CogAuthSignUp, CogAuthVeriCode } from '../../models/CogAuth';
import { useAppDispatch } from '../../store/store-hooks';
import { openSignIn } from '../../common/modal/modal-slice';

export default function Signup() {
  const [signUpState, setSignUpState] = useState('first');

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

  const codeValidationSchema = Yup.object({
    veriCode: Yup.string().required('Verification code is required'),
  });

  const veriObject: CogAuthVeriCode = {
    veriCode: '',
  };

  const dispatch = useAppDispatch();

  const onSignInSwitch = useCallback(() => {
    dispatch(openSignIn());
  }, []);

  const handleSignUp = async (values: CogAuthSignUp) => {
    setSignUpState('second');
  };

  const handleCodeVerification = async (values: CogAuthVeriCode) => {
    console.log('Verfication Submitted');
  };

  const getStepContent = () => {
    if (signUpState === 'first') {
      return (
        <>
          <Typography variant="subtext">
            Register your account with your email. Note your password must contain at least 8 characters.
          </Typography>

          <Formik validationSchema={validationSchema} initialValues={credentials} onSubmit={handleSignUp}>
            {({ handleSubmit, isSubmitting }) => (
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

                  <CsmLoadingBtn
                    fullWidth
                    sx={BtnStyleOutline}
                    variant="contained"
                    type="submit"
                    loading={isSubmitting}
                  >
                    Sign Up
                  </CsmLoadingBtn>
                </Stack>
              </Form>
            )}
          </Formik>

          <Typography variant="subtext">
            By clicking on Sign Up, you agree to our Terms of service and Privacy policy.
          </Typography>
        </>
      );
    }

    if (signUpState === 'second') {
      return (
        <>
          <Typography variant="subtext">
            Verification code has been to your email. Please verify your email address and finalize your registration。
          </Typography>
          <Formik validationSchema={codeValidationSchema} initialValues={veriObject} onSubmit={handleCodeVerification}>
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Stack spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
                  <CsmFormField
                    fullWidth
                    name="veriCode"
                    startAdornment={
                      <InputAdornment position="start">
                        <VpnKeyOutlinedIcon />
                      </InputAdornment>
                    }
                  />

                  <CsmLoadingBtn
                    fullWidth
                    sx={BtnStyleOutline}
                    variant="contained"
                    type="submit"
                    loading={isSubmitting}
                  >
                    Verify
                  </CsmLoadingBtn>
                </Stack>
              </Form>
            )}
          </Formik>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Typography variant="title">Sign Up</Typography>
      {getStepContent()}

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
