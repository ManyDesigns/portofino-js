import {Action, RootAction, LoginAction, CrudAction} from './actions';
import PortofinoConfig from './types/PortofinoConfig';
import NooNoo from './NooNoo';

class PortofinoInstance {
  #rootAction: RootAction;
  #auth: LoginAction;

  constructor(rootAction: RootAction, auth: LoginAction) {
    this.#rootAction = rootAction;
    this.#auth = auth;
  }

  getAction(name: string): Promise<Action> {
    return this.#rootAction.getAction(name);
  }

  getCrudAction(name: string): Promise<CrudAction> {
    return this.#rootAction.getCrudAction(name);
  }

  get http(): NooNoo {
    return this.#rootAction.http;
  }

  get auth(): LoginAction {
    return this.#auth;
  }
}

export default class Portofino {
  static #instance: PortofinoInstance;

  private constructor() {}

  static connect(config: PortofinoConfig) {
    if (Portofino.#instance)
      throw new Error('PortofinoJS is already connected!');
    Portofino.#instance = Portofino.createInstance(config);
  }


  static createInstance({
    url = '/api',
    axiosInstance,
    enableAuth = true,
    authAction = ':auth',
    crudActionClasses
  }: PortofinoConfig) {
    const baseURL = axiosInstance ? '' : url;
    console.log("authAction", authAction)

    if (baseURL) console.debug('[Portofino] Connecting to ', baseURL);
    else console.debug('[Portofino] Connecting via axios instance');

    const noo = NooNoo.create(baseURL, axiosInstance, authAction);
    const rootAction = new RootAction(noo, crudActionClasses);

    let auth: LoginAction;
    if (enableAuth) auth = new LoginAction(noo, authAction, crudActionClasses);

    return new PortofinoInstance(rootAction, auth);
  }

  private static checkConnection() {
    if (!Portofino.#instance) throw new Error('PortofinoJS is not connected!');
  }

  static getAction(name: string): Promise<Action> {
    Portofino.checkConnection();
    return this.#instance.getAction(name);
  }

  static getCrudAction(name: string): Promise<CrudAction> {
    Portofino.checkConnection();
    return this.#instance.getCrudAction(name);
  }

  static get http(): NooNoo {
    Portofino.checkConnection();
    return this.#instance.http;
  }

  static get auth(): LoginAction {
    Portofino.checkConnection();
    return this.#instance.auth;
  }
}
