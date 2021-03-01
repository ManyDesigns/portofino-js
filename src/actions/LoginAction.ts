import { Action } from "./Action";
import NooNoo from "../NooNoo";

const qs = require('qs');

const JWT_KEY = 'portofino_jwt';

export interface UserInfo {
  displayName: string;
  administrator: boolean;
  groups: string[];
  jwt: string;

  [key: string]: any;
}

export class LoginAction extends Action {
  private _jwt?: string;

  constructor(_nooNoo: NooNoo, public action: string, crudActionClasses: string[]) {
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
    return await this.http.post(':reset-password', { resetToken, newPassword });
  }

  //Autentication
  isAuthenticated() {
    return !!this._jwt;
  }

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

  async login(username: string, password: string) {
    const loginParams = qs.stringify({ username, password });

    try {
      const { data: login } = await this.http.post('', loginParams, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      this._jwt = "Bearer " + login.jwt;
      localStorage.setItem(JWT_KEY, this._jwt);
      // console.log('[Portofino] User logged in successfully', this._jwt);
    } catch (e) {
      throw e;
    }
  }

  async logout() {
    localStorage.removeItem(JWT_KEY);
    // delete axios.defaults.headers.Authorization;
  }
}