import { makeAutoObservable, runInAction } from 'mobx';
import authAgent from '../api/authAgent';
import { CogAuthLogin } from '../models/CogAuth';

export default class AuthStore {
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  checkAuth = async () => {
    try {
      console.log('checking auth with cognito');
      runInAction(() => {
        this.isLoggedIn = false;
      });
    } catch (err) {
      console.log(err);
    }
  };

  login = async (credentials: CogAuthLogin) => {
    try {
      // await authAgent.login(credentials)
      await authAgent.testAsync();
      console.log(credentials);
      console.log('login succeeded');
      runInAction(() => {
        this.isLoggedIn = true;
      });
    } catch (err) {
      throw new Error('Not implemented');
    }
  };
}
