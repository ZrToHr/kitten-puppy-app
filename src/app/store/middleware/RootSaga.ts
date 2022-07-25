import { all, call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  InvokeSignIn,
  InvokeSignUp,
  InvokeSignUpConfirmation,
  SignInFailed,
  SignInSucceeded,
  SignUpConfirmationFailed,
  SignUpConfirmationSucceeded,
  SignUpFailed,
  SignUpSucceeded,
} from '../../features/auth/auth-slice';
import { openRegistrationConfirm, openSignIn } from '../../common/modal/modal-slice';
import authAgent from '../../api/authAgent';
import { CogAuthLogin, CogAuthSignUp } from '../../models/CogAuth';
import { closeSnackbar, MessageType, openSnackbar, SnackbarPayload } from '../../common/snackbar/snackbar-slice';
import { history } from '../../../index';

function* validateLoginCredential(action: PayloadAction<CogAuthLogin>) {
  try {
    yield call(authAgent.testAsync);
    yield put(SignInSucceeded());
    yield call(history.push, '/tests');
  } catch (e) {
    yield put(SignInFailed());
  }
}

function* postSignUpCredential(action: PayloadAction<CogAuthSignUp>) {
  try {
    yield call(authAgent.signUp, action.payload);
    yield all([put(SignUpSucceeded()), put(openRegistrationConfirm())]);

    yield delay(100);
    const codeSentMsg: SnackbarPayload = {
      message: `Confirmation code has been sent to ${action.payload.email}`,
      type: MessageType.Info,
    };
    yield put(openSnackbar(codeSentMsg));
  } catch (error) {
    const { message: msg } = error as Error;
    yield put(openSnackbar({ message: msg, type: MessageType.Error }));
    yield put(SignUpFailed());
  }
}

function* postConfirmationCode(action: PayloadAction<string>) {
  try {
    yield call(authAgent.confirmRegistration, action.payload);
    const registerSuccessMsg: SnackbarPayload = {
      message: 'Sign up successfully, navigating to Login...',
      type: MessageType.Success,
    };
    yield put(SignUpConfirmationSucceeded());
    yield put(openSnackbar(registerSuccessMsg));
    yield delay(3100);
    yield put(openSignIn());
  } catch (error) {
    const { message: msg } = error as Error;
    yield put(openSnackbar({ message: msg, type: MessageType.Error }));
    yield put(SignUpConfirmationFailed());
  }
}

function* snackbarWatcher() {
  yield delay(3000);
  yield put(closeSnackbar());
}

export default function* rootSage() {
  yield takeEvery(InvokeSignIn.type, validateLoginCredential);
  yield takeEvery(InvokeSignUp.type, postSignUpCredential);
  yield takeEvery(InvokeSignUpConfirmation.type, postConfirmationCode);
  yield takeLatest(openSnackbar.type, snackbarWatcher);
}
