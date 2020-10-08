import {Action, RootAction} from "./actions/internal";
import {AxiosInstance} from "axios";
import NooNoo from "./NooNoo";
import LoginActionManager from "./LoginActionManager";

export interface PortofinoConfig {
  url: string;
  axiosInstance?: AxiosInstance;
  enableAuth?: boolean;
  authAction?: string;
  //todo keepSessionAlive:boolean -> definisce se creare una chiamata ricorrente per mantenere valida la sessione
}

export default class Portofino {
  private static rootAction: RootAction;
  public static auth: LoginActionManager;

  private constructor() {}

  static connect(config: PortofinoConfig) {
    const baseURL = config.axiosInstance ? '' : (config.url || '/api');

    if (baseURL)
      console.debug('[Portofino] Connecting to ', baseURL);
    else
      console.debug('[Portofino] Connecting via axios instance');

    if (Portofino.rootAction)
      throw new Error("PortofinoJS is already connected!")

    const noo = NooNoo.create(baseURL, config.axiosInstance);
    this.rootAction = new RootAction(noo);
    this.auth = new LoginActionManager(noo)
  }

  static getAction(name): Promise<Action> {
    if (!Portofino.rootAction)
      throw new Error("PortofinoJS is not connected!")
    return this.rootAction.getAction(name);
  }

  static get http(): NooNoo {
    if (!Portofino.rootAction)
      throw new Error("PortofinoJS is not connected!")
    return this.rootAction.http;
  }
}
