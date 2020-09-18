import {Action} from "./internal";
import NooNoo from "../NooNoo";

const qs = require('qs');

// type AuthChangeCallback = () => void;

export class LoginAction extends Action {
  private _username: string;
  private _displayName: string;
  private _groups: string[];
  private _jwt: string;

  static async createAuthInstance(nooNoo: NooNoo, loginAction: string): Promise<LoginAction> {
    const jwt = localStorage.getItem("portofino_jwt");
    const authInstance = new LoginAction(nooNoo, loginAction);

    if (jwt) {
      authInstance._jwt = jwt
      // axios.defaults.headers["Authorization"] = authInstance._jwt;
      await authInstance.fetchUserData();
    }

    return authInstance;
  }

  private async fetchUserData() {
    try {
      const {data: user} = await this.http.get('');
      console.debug('[Portofino] User debug data', user);
      return user;
    } catch (e) {
      console.warn('[Portofino] Session expired, jwt removed from local storage');
      await this.logout(false)
      throw e;
    }
  }

  async login({username, password}) {
    const loginParams = qs.stringify({username, password});
    const loginReqHeaders = {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    };

    try {
      const {data: login} = await this.http.post('', loginParams, loginReqHeaders)
      this._jwt = "Bearer " + login.jwt;
      localStorage.setItem("portofino_jwt", this._jwt);
      console.log('[Portofino] User logged in successfully', this._jwt);
    } catch (e) {
      throw e;
    }
  }

  async logout(shouldRevokeToken: boolean = false) {
    localStorage.removeItem("portofino_jwt");
    // delete axios.defaults.headers.Authorization;
    if (shouldRevokeToken)
      await this.http.delete('');
  }

  isAuthenticated() {
    return !!this._jwt;
  }

  //TODO onAuthStateChanged(callback: AuthChangeCallback) {}
}
