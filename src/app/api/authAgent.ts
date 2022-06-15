import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  ICognitoUserData,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoIdToken,
} from 'amazon-cognito-identity-js';
import { CognitoConfig } from '../configs/cognitoConfig';
import { CogAuthLogin } from '../models/CogAuth';

const poolData = {
  UserPoolId: CognitoConfig.userPoolId,
  ClientId: CognitoConfig.appClientId,
};

const userPool = new CognitoUserPool(poolData);

let IdToken: CognitoIdToken;

let cognitoSession: CognitoUserSession;

const testAsync = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      console.log('in timeout');
      resolve('succeeded');
    }, 1000);
  });

const signUp = () =>
  new Promise((resolve, reject) => {
    const attributeList: CognitoUserAttribute[] = [];
    userPool.signUp('username', 'password', attributeList, [], (err) => {
      if (err) {
        console.log('Sign Up Cognito User Errors: ', err.message || JSON.stringify(err));
        reject(err);
      }
      resolve(true);
    });
  });

/**
 * users need to confirm their signup with confirmation code sent to them
 */
const confirmRegistration = (code: string) =>
  new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      reject(new Error('CognitoUser Null'));
    }

    cognitoUser?.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve('Registration Confirmed');
    });
  });

/**
 * users can request new confirmation code on sign up step
 */
const resendConfirmationCode = () =>
  new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
      reject(new Error('CognitoUser Null'));
    }

    cognitoUser?.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
      }

      resolve('Resend Code Succeeded');
    });
  });

const forgotPassword = (username: string) =>
  new Promise((resolve, reject) => {
    const userData: ICognitoUserData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess(data) {
        throw new Error('Not implemented');
      },
      onFailure(data) {
        throw new Error('Not implemented');
      },
      inputVerificationCode(data) {
        throw new Error('Not implemented');
      },
    });
  });

const confirmNewPassword = (username: string, verficationCode: string, newPassword: string) =>
  new Promise((resolve, reject) => {
    const userData: ICognitoUserData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmPassword(verficationCode, newPassword, {
      onSuccess() {
        resolve('Password Confirmed');
      },
      onFailure(err) {
        reject(new Error('Password not Confirmed'));
      },
    });
  });

const login = (credentials: CogAuthLogin) =>
  new Promise((resolve, reject) => {
    const authenticationData = {
      Username: credentials.username,
      Password: credentials.password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData: ICognitoUserData = {
      Username: credentials.username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result) {
        IdToken = result.getIdToken();
        cognitoSession = result;
        resolve('Login Succeeded');
      },
      onFailure(err) {
        reject(err);
      },
    });
  });

/**
 * method to check whether cognito session has been stored in localStorage
 * valid session should require users login one more time
 */
const checkAuthentication = () =>
  new Promise((resolve, reject) => {
    // getCurrentUser will read cognitoUser from localStorage
    const cognitoUser = userPool.getCurrentUser();

    // if no cached cognitoUser, return false
    if (!cognitoUser) resolve(false);

    // refreshSession() gets called inside getSession().
    // this means we can get access to latest tokens in getSession callback
    cognitoUser?.getSession((err: any, session: CognitoUserSession) => {
      if (err) resolve(false);

      // if session no valid any more, users should login one more time
      if (!session.isValid()) resolve(false);

      IdToken = session.getIdToken();

      cognitoSession = session;

      resolve(true);
    });
  });

/**
 * refresh Id token in memory
 */
const refreshTokens = () =>
  new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) reject(new Error('No CognitoUser'));

    if (!cognitoSession) reject(new Error('No CognitoSession'));

    const refreshToken = cognitoSession.getRefreshToken();
    cognitoUser?.refreshSession(refreshToken, (err, session) => {
      if (err) reject(err);

      IdToken = session.getIdToken();
    });
  });

const getIdToken = () => IdToken;

const authAgent = {
  signUp,
  confirmRegistration,
  resendConfirmationCode,
  forgotPassword,
  confirmNewPassword,
  login,
  checkAuthentication,
  refreshTokens,
  getIdToken,
  testAsync,
};

export default authAgent;
