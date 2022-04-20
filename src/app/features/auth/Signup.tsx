import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  InputAdornment,
  Typography,
} from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Stack from '@mui/material/Stack';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Login from './Login';
import { useStore } from '../../stores/store';
import CsmFormField from '../../common/form/CsmFormField';
import { BtnStyleOutline, StyledDivider } from '../../../theme';
import { CogAuthSignUp, CogAuthVeriCode } from '../../models/CogAuth';

export default function Signup() {
  const { modalStore } = useStore();

  const [signUpState, setSignUpState] = useState('first');

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Email address is required'),
    password: Yup.string().required('Password is required'),
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

  const handleSignUp = (values: CogAuthSignUp) => {
    setSignUpState('second');
  };

  const handleCodeVerification = (values: CogAuthVeriCode) => {
    console.log('Verfication Submitted');
  };

  const getStepContent = () => {
    if (signUpState === 'first') {
      return (
        <>
          <Typography variant="subtext">
            Simply register your account with your email. Note your password
            must contain at least 8 characters.
          </Typography>

          <Formik
            validationSchema={validationSchema}
            initialValues={credentials}
            onSubmit={handleSignUp}
          >
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
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    }
                  />

                  <Button
                    fullWidth
                    sx={BtnStyleOutline}
                    variant="contained"
                    type="submit"
                  >
                    <CircularProgress
                      color="inherit"
                      size={16}
                      sx={{ marginRight: '8px' }}
                    />
                    Sign up
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>

          <Typography variant="subtext">
            By clicking on Sign up, you agree to our Terms of service and
            Privacy policy.
          </Typography>
        </>
      );
    }

    if (signUpState === 'second') {
      return (
        <>
          <Typography variant="subtext">
            Verification code has been to your email. Please verify your email
            address and finalize your registration。
          </Typography>
          <Formik
            validationSchema={codeValidationSchema}
            initialValues={veriObject}
            onSubmit={handleCodeVerification}
          >
            {({ handleSubmit }) => (
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

                  <Button
                    fullWidth
                    sx={BtnStyleOutline}
                    variant="contained"
                    type="submit"
                  >
                    <CircularProgress
                      color="inherit"
                      size={16}
                      sx={{ marginRight: '8px' }}
                    />
                    Verify
                  </Button>
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
          onClick={() => {
            modalStore.updateModalBoday(<Login />);
          }}
        >
          &nbsp; Sign in
        </Typography>
      </Typography>
    </>
  );
}
