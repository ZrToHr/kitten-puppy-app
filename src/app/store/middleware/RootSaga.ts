import { takeEvery, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  InvokeSignIn,
  InvokeSignUp,
  SignInFailed,
  SignInSucceeded,
  SignUpFailed,
  SignUpSucceeded,
} from '../../features/auth/auth-slice';
import authAgent from '../../api/authAgent';
import { CogAuthLogin, CogAuthSignUp } from '../../models/CogAuth';

function* validateLoginCredential(action: PayloadAction<CogAuthLogin>) {
  try {
    console.log('test saga payload', action.payload);
    // lied to typescript, need to fix it with proper type checking
    const result: string = yield call(authAgent.testAsync);
    yield put(SignInSucceeded());
  } catch (e) {
    yield put(SignInFailed());
  }
}

function* postSignUpCredential(action: PayloadAction<CogAuthSignUp>) {
  try {
    const result: boolean = yield call(authAgent.signUp, action.payload);
    yield put(SignUpSucceeded());
  } catch (e) {
    yield put(SignUpFailed());
  }
}

export default function* rootSage() {
  yield takeEvery(InvokeSignIn.type, validateLoginCredential);
  yield takeEvery(InvokeSignUp.type, postSignUpCredential);
}
