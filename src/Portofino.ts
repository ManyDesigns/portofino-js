import { Action, RootAction, LoginAction } from './actions';
import { AxiosInstance } from 'axios';
import NooNoo from './NooNoo';

export interface PortofinoConfig {
  url?: string;
  axiosInstance?: AxiosInstance;

  enableAuth?: boolean;
  authAction?: string;

  crudActionClasses?: string[];
}

export default class Portofino {
  private static rootAction: RootAction;
  public static auth: LoginAction;

  private constructor() {}

  static connect({
    url = '/api',
    axiosInstance,
    enableAuth = true,
    authAction = 'login',
    crudActionClasses,
  }: PortofinoConfig) {
    const baseURL = axiosInstance ? '' : url;

    if (baseURL) console.debug('[Portofino] Connecting to ', baseURL);
    else console.debug('[Portofino] Connecting via axios instance');

    if (Portofino.rootAction)
      throw new Error('PortofinoJS is already connected!');

    const noo = NooNoo.create(baseURL, axiosInstance);
    this.rootAction = new RootAction(noo, crudActionClasses);

    if (enableAuth)
      this.auth = new LoginAction(noo, authAction, crudActionClasses);
  }

  private static checkConnection() {
    if (!Portofino.rootAction) throw new Error('PortofinoJS is not connected!');
  }

  static getAction(name: string): Promise<Action> {
    Portofino.checkConnection();
    return this.rootAction.getAction(name);
  }

  static get http(): NooNoo {
    Portofino.checkConnection();
    return this.rootAction.http;
  }
}
