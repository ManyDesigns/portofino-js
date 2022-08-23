import {Action, CrudAction, LoginAction, RootAction} from './actions';
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

    changeBaseUrl(url: string): void {
        this.#rootAction.changeBaseUrl(url);
    }

    get http(): NooNoo {
        return this.#rootAction.http;
    }

    get auth(): LoginAction {
        return this.#auth;
    }

}

class PortofinoCacheInstance extends PortofinoInstance {

    #actionCache = new Map<String, Action>();

    constructor(rootAction: RootAction, auth: LoginAction) {
        super(rootAction, auth);
    }

    private calculateCacheKey(actionName: string): string {
        const baseUrl = this.http.baseURL;
        return`${baseUrl}/${actionName}`;
    }

    getCrudAction(name: string): Promise<CrudAction> {
        const key = this.calculateCacheKey(name);

        if (this.#actionCache.has(key)) {
            const action = this.#actionCache.get(key);
            return new Promise<CrudAction>((resolve) => resolve(action as CrudAction));
        }

        return super.getCrudAction(name)
            .then(action => {
                this.#actionCache.set(key, action);
                return action;
            });
    }

    getAction(name: string): Promise<Action> {
        const key = this.calculateCacheKey(name);

        if (this.#actionCache.has(key)) {
            const action = this.#actionCache.get(key);
            return new Promise<Action>((resolve) => resolve(action));
        }

        return super.getAction(name)
            .then(action => {
                this.#actionCache.set(key, action);
                return action;
            });
    }

}

export default class Portofino {
    static #instance: PortofinoInstance;

    private constructor() {
    }

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
                              crudActionClasses,
                              useCache = false
                          }: PortofinoConfig) {
        const baseURL = axiosInstance ? '' : url;
        console.log("authAction", authAction)

        if (baseURL) console.debug('[Portofino] Connecting to ', baseURL);
        else console.debug('[Portofino] Connecting via axios instance');

        const noo = NooNoo.create(baseURL, axiosInstance, authAction);
        const rootAction = new RootAction(noo, crudActionClasses);
        let auth: LoginAction;
        if (enableAuth) auth = new LoginAction(noo, authAction, crudActionClasses);

        return useCache ? new PortofinoCacheInstance(rootAction, auth) : new PortofinoInstance(rootAction, auth);
    }

    private static checkConnection() {
        if (!Portofino.#instance) throw new Error('PortofinoJS is not connected!');
    }

    static getInstance(): PortofinoInstance {
        return this.#instance;
    }

    static getAction(name: string): Promise<Action> {
        Portofino.checkConnection();
        return this.#instance.getAction(name);
    }

    static getCrudAction(name: string): Promise<CrudAction> {
        Portofino.checkConnection();
        return this.#instance.getCrudAction(name);
    }

    static changeBaseUrl(url: string): void {
        Portofino.checkConnection();
        this.#instance.changeBaseUrl(url);
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
