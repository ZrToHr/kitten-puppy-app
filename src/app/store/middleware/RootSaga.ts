import { takeEvery, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { InvokeSignIn, SignInFailed, SignInSucceeded } from '../../features/auth/auth-slice';
import authAgent from '../../api/authAgent';
import { CogAuthLogin } from '../../models/CogAuth';

export function* validateLoginCredential(action: PayloadAction<CogAuthLogin>) {
  try {
    console.log('test saga payload', action.payload);
    // lied to typescript, need to fix it with proper type checking
    const result: string = yield call(authAgent.testAsync);
    yield put(SignInSucceeded());
  } catch (e) {
    yield put(SignInFailed());
  }
}

export default function* rootSage() {
  yield takeEvery(InvokeSignIn.type, validateLoginCredential);
}
