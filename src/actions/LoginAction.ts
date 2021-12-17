import { Action } from '.';
import * as qs from 'qs';
import NooNoo from '../NooNoo';

const JWT_KEY = 'portofino_jwt';

export interface UserInfo {
  displayName: string;
  administrator: boolean;
  groups: string[];
  jwt: string;

  [key: string]: any;
}

interface StateChangeObserverList {
  id: number;
  callback: (a: UserInfo | null) => any;
}

export class LoginAction extends Action {
  private _jwt?: string;

  private stateChangeObserver: StateChangeObserverList[] = [];
  private stateChangeSequence = 0;

  constructor(
    _nooNoo: NooNoo,
    public action: string,
    crudActionClasses: string[]
  ) {
    super(_nooNoo, action, crudActionClasses);
    this._jwt = localStorage.getItem(JWT_KEY);
  }

  async passwordReset(email: String, siteName: String, resetPageURL: String) {
    await this.http.post(':send-reset-password-email', {
      email: email,
      siteNameOrAddress: siteName,
      loginPageUrl: resetPageURL,
    });
  }

  async doPasswordReset(resetToken: String, newPassword: String) {
    return await this.http.post(':reset-password', {
      token: resetToken,
      newPassword,
    });
  }

  //Auth state
  isAuthenticated() {
    return !!this._jwt;
  }

  onAuthStateChanged(nextOrObserver: (a: UserInfo | null) => any): () => any {
    const observerId = this.stateChangeSequence++;
    this.stateChangeObserver.push({
      id: observerId,
      callback: nextOrObserver,
    });

    return () => {
      this.stateChangeObserver = this.stateChangeObserver.filter(
        (el) => el.id !== observerId
      );
    };
  }

  private emitAuthStateChange(user: UserInfo) {
    this.stateChangeObserver.forEach(({ callback }) => callback(user));
  }

  //Autentication
  async getUserInfo() {
    try {
      const { data: user } = await this.http.get('');
      return user;
    } catch (e) {
      console.debug('[Portofino] Session expired, logging out');
      await this.logout();
      throw e;
    }
  }

  async checkAuth() {
    try {
      await this.getUserInfo();
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(username: string, password: string): Promise<UserInfo> {
    const loginParams = qs.stringify({ username, password });

    try {
      const { data: user } = await this.http.post('', loginParams, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      this._jwt = `Bearer ${user.jwt}`;
      localStorage.setItem(JWT_KEY, this._jwt);
      this.emitAuthStateChange(user);
      // console.log('[Portofino] User logged in successfully', this._jwt);

      return user;
    } catch (e) {
      throw e;
    }
  }

  async logout() {
    localStorage.removeItem(JWT_KEY);
    this.emitAuthStateChange(null);
    // delete axios.defaults.headers.Authorization;
  }
}
