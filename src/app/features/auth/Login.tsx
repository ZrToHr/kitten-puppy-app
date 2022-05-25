import React, { useCallback } from 'react';
import { InputAdornment, Typography } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Stack from '@mui/material/Stack';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Signup from './Signup';
import CsmFormField from '../../common/form/CsmFormField';
import { BtnStyleOutline, StyledDivider } from '../../../theme';
import CsmLoadingBtn from '../../common/button/CsmLoadingBtn';
import { CogAuthLogin } from '../../models/CogAuth';
import { useAppDispatch } from '../../store/store-hooks';
import { openModal } from '../../common/modal/modal-slice';

export default function Login() {
  const validationSchema = Yup.object({
    username: Yup.string().required('Email address is required'),
    password: Yup.string().required('Password is required'),
  });

  const credientials: CogAuthLogin = {
    username: '',
    password: '',
  };

  const dispatch = useAppDispatch();

  const onSignUpSwitch = useCallback(() => {
    dispatch(openModal(<Signup />));
  }, [openModal]);

  return (
    <>
      <Typography variant="title">Sign In</Typography>
      <Typography variant="subtext">
        Build your cloud albums for your kitten and puppy.
      </Typography>

      <Formik
        validationSchema={validationSchema}
        initialValues={credientials}
        onSubmit={(values) => {
          console.log('To do');
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
          onClick={onSignUpSwitch}
        >
          &nbsp; Sign up
        </Typography>
      </Typography>
    </>
  );
}
