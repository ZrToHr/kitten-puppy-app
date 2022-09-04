import { InputAdornment, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { Form, Formik } from 'formik';
import Stack from '@mui/material/Stack';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import * as Yup from 'yup';
import CsmFormField from '../../common/form/CsmFormField';
import CsmLoadingBtn from '../../common/button/CsmLoadingBtn';
import { BtnStyleOutline } from '../../../theme';
import { CogAuthVeriCode } from '../../models/CogAuth';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { InvokeSignUpConfirmation } from './auth-slice';

export default function RegistrationConfirm() {
  const codeValidationSchema = Yup.object({
    veriCode: Yup.string().required('Verification code is required'),
  });

  const veriObject: CogAuthVeriCode = {
    veriCode: '',
  };

  const dispatch = useAppDispatch();

  const { isAuthing: isSubmitting } = useAppSelector((state) => state.auth);

  const onVerifyConfirmationCode = useCallback((values: CogAuthVeriCode) => {
    dispatch(InvokeSignUpConfirmation(values.veriCode));
  }, []);

  return (
    <>
      <Typography variant="title">Confirm Registration</Typography>
      <Typography variant="subtext">
        Verification code has been sent to your email. Please verify your email address and finalize your registration.
      </Typography>
      <Formik validationSchema={codeValidationSchema} initialValues={veriObject} onSubmit={onVerifyConfirmationCode}>
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

              <CsmLoadingBtn fullWidth sx={BtnStyleOutline} variant="contained" type="submit" loading={isSubmitting}>
                Verify
              </CsmLoadingBtn>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
}
