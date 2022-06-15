import { takeEvery, put, call } from 'redux-saga/effects';
import { InvokeSignIn, SignInFailed, SignInSucceeded } from '../../features/auth/auth-slice';
import authAgent from '../../api/authAgent';

export function* validateLoginCredential() {
  try {
    yield put(InvokeSignIn);
    // lied to typescript, need to fix it with proper type checking
    const result: string = yield call(authAgent.testAsync);
    yield put(SignInSucceeded);
  } catch (e) {
    yield put(SignInFailed);
  }
}

export default function* rootSage() {
  yield takeEvery(InvokeSignIn, validateLoginCredential);
}
