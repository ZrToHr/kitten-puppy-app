import { takeEvery, put, call, all, StrictEffect } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  InvokeSignIn,
  InvokeSignUp,
  SignInFailed,
  SignInSucceeded,
  SignUpFailed,
  SignUpSucceeded,
} from '../../features/auth/auth-slice';
import { openRegistrationConfirm } from '../../common/modal/modal-slice';
import authAgent from '../../api/authAgent';
import { CogAuthLogin, CogAuthSignUp } from '../../models/CogAuth';
import { MessageType, openSnackbar } from '../../common/snackbar/snackbar-slice';

function* validateLoginCredential(action: PayloadAction<CogAuthLogin>) {
  try {
    // lied to typescript, need to fix it with proper type checking
    const result: string = yield call(authAgent.testAsync);
    yield put(SignInSucceeded());
  } catch (e) {
    yield put(SignInFailed());
  }
}

function* postSignUpCredential(action: PayloadAction<CogAuthSignUp>): Generator<StrictEffect, void, string> {
  try {
    yield call(authAgent.signUp, action.payload);
    yield all([put(SignUpSucceeded()), put(openRegistrationConfirm())]);
  } catch (error) {
    const { message: msg } = error as Error;
    yield put(openSnackbar({ message: msg, type: MessageType.Error }));
    yield put(SignUpFailed());
  }
}

function* postConfirmationCode(action: PayloadAction<string>) {
  try {
    const result: boolean = yield call(authAgent.confirmRegistration, action.payload);
  } catch (e) {
    yield;
  }
}

export default function* rootSage() {
  yield takeEvery(InvokeSignIn.type, validateLoginCredential);
  yield takeEvery(InvokeSignUp.type, postSignUpCredential);
}
