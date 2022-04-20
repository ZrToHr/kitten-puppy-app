import React from 'react';
import { InputAdornment, Typography } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Stack from '@mui/material/Stack';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Signup from './Signup';
import { useStore } from '../../stores/store';
import CsmFormField from '../../common/form/CsmFormField';
import { BtnStyleOutline, StyledDivider } from '../../../theme';
import CsmLoadingBtn from '../../common/button/CsmLoadingBtn';
import { CogAuthLogin } from '../../models/CogAuth';

export default function Login() {
  const { modalStore, authStore } = useStore();

  const validationSchema = Yup.object({
    username: Yup.string().required('Email address is required'),
    password: Yup.string().required('Password is required'),
  });

  const credientials: CogAuthLogin = {
    username: '',
    password: '',
  };

  return (
    <>
      <Typography variant="title">Sign In</Typography>
      <Typography variant="subtext">
        Build your shared cloud albums specifically for your pets.
      </Typography>

      <Formik
        validationSchema={validationSchema}
        initialValues={credientials}
        onSubmit={(values) => {
          authStore.login(values);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Stack spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
              <CsmFormField
                fullWidth
                name="username"
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

              <CsmLoadingBtn
                fullWidth
                sx={BtnStyleOutline}
                variant="contained"
                type="submit"
                loading={isSubmitting}
              >
                Sign in
              </CsmLoadingBtn>
            </Stack>
          </Form>
        )}
      </Formik>

      <StyledDivider variant="middle" />

      <Typography variant="subtext">
        No account yet?
        <Typography
          variant="subtext"
          sx={{ fontWeight: 'bold', display: 'inline', cursor: 'pointer' }}
          onClick={() => {
            modalStore.updateModalBoday(<Signup />);
          }}
        >
          &nbsp; Sign up
        </Typography>
      </Typography>
    </>
  );
}
