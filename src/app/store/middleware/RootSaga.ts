import { all, call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CheckAuthentication,
  InvokeSignIn,
  InvokeSignOut,
  InvokeSignUp,
  InvokeSignUpConfirmation,
  SignInFailed,
  SignInSucceeded,
  SignUpConfirmationFailed,
  SignUpConfirmationSucceeded,
  SignUpFailed,
  SignUpSucceeded,
  UserAuthenticated,
} from '../../features/auth/auth-slice';
import { openRegistrationConfirm, openSignIn } from '../../common/modal/modal-slice';
import authAgent from '../../api/authAgent';
import axiosAgent from '../../api/axiosAgent';
import { CogAuthLogin, CogAuthSignUp } from '../../models/CogAuth';
import { closeSnackbar, MessageType, openSnackbar, SnackbarPayload } from '../../common/snackbar/snackbar-slice';
import { history } from '../../../index';
import { Album, AlbumRetrieve, AlbumFile, AlbumUpload, AlbumPhoto } from '../../models/Album';
import { ReceivedAlbum, RetrieveAlbum, UploadToAlbum } from '../../features/highlights/album-slice';

function* validateLoginCredential(action: PayloadAction<CogAuthLogin>) {
  try {
    yield call(authAgent.login, action.payload);
    const userSub = authAgent.getIdToken().payload.sub;
    yield put(SignInSucceeded(userSub));
    // yield call(history.push, `/${userSub}`);
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

function* checkAuthentication() {
  const isLoggedIn: boolean = yield call(authAgent.checkAuthentication);
  if (isLoggedIn) {
    const userSub = authAgent.getIdToken().payload.sub;
    yield put(UserAuthenticated(userSub));
  }
}

function* clearUserSession() {
  yield call(authAgent.signOut);
}

function* retrieveAlbum(action: PayloadAction<string>) {
  try {
    const payload: AlbumRetrieve = {
      UserId: action.payload,
    };
    const album: Album = yield call(axiosAgent.album.retrieve, payload);
    yield put(ReceivedAlbum(album));
  } catch (error) {
    console.log(error);
  }
}

function* uploadToAlbum(action: PayloadAction<AlbumFile>) {
  try {
    const payload: AlbumUpload = {
      UserId: action.payload.UserId,
      PhotoName: action.payload.PhotoFile.name,
      PhotoType: action.payload.PhotoFile.type,
    };
    const photo: AlbumPhoto = yield call(axiosAgent.album.upload, payload);
    yield call(axiosAgent.album.savePhoto, photo.PhotoSignedUrl!, action.payload.PhotoFile);
    yield put(RetrieveAlbum(payload.UserId));
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSage() {
  yield takeEvery(InvokeSignIn.type, validateLoginCredential);
  yield takeEvery(InvokeSignUp.type, postSignUpCredential);
  yield takeEvery(InvokeSignUpConfirmation.type, postConfirmationCode);
  yield takeEvery(CheckAuthentication.type, checkAuthentication);
  yield takeEvery(InvokeSignOut.type, clearUserSession);
  yield takeLatest(openSnackbar.type, snackbarWatcher);
  yield takeEvery(RetrieveAlbum.type, retrieveAlbum);
  yield takeEvery(UploadToAlbum.type, uploadToAlbum);
}
