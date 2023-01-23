import {Action, CrudAction, LoginAction, RootAction} from './actions';
import PortofinoConfig from './types/PortofinoConfig';
import NooNoo from './NooNoo';

class PortofinoInstance {
    #instanceName: string;
    #rootAction: RootAction;
    #auth: LoginAction;

    constructor(instanceName: string, rootAction: RootAction, auth: LoginAction) {
        this.#instanceName = instanceName;
        this.#rootAction = rootAction;
        this.#auth = auth;
    }

    getAction(name: string): Promise<Action> {
        return this.#rootAction.getAction(name);
    }

    getCrudAction(name: string): Promise<CrudAction> {
        return this.#rootAction.getCrudAction(name);
    }

    /**
     *
     * @deprecated Dovresti creare una nuova istanza di PortofinoJs
     */
    changeBaseUrl(url: string): void {
        this.#rootAction.changeBaseUrl(url);
        this.#auth.changeBaseUrl(url);
    }

    get http(): NooNoo {
        return this.#rootAction.http;
    }

    get auth(): LoginAction {
        return this.#auth;
    }

    get name(): string {
        return this.#instanceName;
    }

}

class PortofinoCacheInstance extends PortofinoInstance {

    #actionCache = new Map<String, Action>();

    constructor(instanceName: string, rootAction: RootAction, auth: LoginAction) {
        super(instanceName, rootAction, auth);
    }

    private calculateCacheKey(actionName: string): string {
        const baseUrl = this.http.baseURL;
        return `${baseUrl}/${actionName}`;
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

    static #instances: Map<string, PortofinoInstance> = new Map<string, PortofinoInstance>();

    private constructor() {
    }

    static connect(config: PortofinoConfig) {
        const instanceName = config.name || 'default';
        if (Portofino.#instances.has(instanceName))
            throw new Error(`PortofinoJS for instance ${instanceName} is already connected!`);
        // Portofino.#instance = Portofino.createInstance(config);
        console.debug(`Portofino(${instanceName}): creating instance!`);
        const instance = Portofino.createInstance(config);
        Portofino.#instances.set(instanceName, instance);
    }


    static createInstance({
                              name = 'default',
                              url = '/api',
                              axiosInstance,
                              enableAuth = true,
                              authAction = ':auth',
                              crudActionClasses,
                              useCache = false
                          }: PortofinoConfig) {
        const baseURL = axiosInstance ? '' : url;
        console.log("authAction", authAction)

        if (baseURL) console.debug(`[Portofino(${name})] Connecting to `, baseURL);
        else console.debug(`[Portofino(${name})] Connecting via axios instance`);

        const noo = NooNoo.create(baseURL, axiosInstance, authAction);
        const rootAction = new RootAction(noo, crudActionClasses);
        let auth: LoginAction;
        if (enableAuth) auth = new LoginAction(noo, authAction, crudActionClasses);

        return useCache ? new PortofinoCacheInstance(name, rootAction, auth) : new PortofinoInstance(name, rootAction, auth);
    }

    private static checkConnection() {
        if (!Portofino.#instances.has('default')) throw new Error('PortofinoJS is not connected!');
    }

    static getInstance(name = 'default'): PortofinoInstance {
        return this.#instances.get(name);
    }

    static getAction(name: string): Promise<Action> {
        Portofino.checkConnection();
        return Portofino.getDefaultInstance().getAction(name);
    }

    static getCrudAction(name: string): Promise<CrudAction> {
        Portofino.checkConnection();
        return Portofino.getDefaultInstance().getCrudAction(name);
    }

    static changeBaseUrl(url: string): void {
        Portofino.checkConnection();
        Portofino.getDefaultInstance().changeBaseUrl(url);
    }

    static get http(): NooNoo {
        Portofino.checkConnection();
        return Portofino.getDefaultInstance().http;
    }

    static get auth(): LoginAction {
        Portofino.checkConnection();
        return Portofino.getDefaultInstance().auth;
    }

    private static getDefaultInstance(): PortofinoInstance {
        return this.#instances.get('default');
    }
}
