/** That's just an axios wrapper **/
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {joinPath} from './lib/utils';
import {JWT_KEY, LoginAction} from "./actions";
import AuthAction from "./types/AuthAction";

export default class NooNoo {
    #instance: AxiosInstance;
    static request = 0;
    #authAction;

    private constructor(private readonly _baseURL: string, instance: AxiosInstance, authAction?: AuthAction | string) {
        this.#instance = instance;
        this.#authAction = authAction;
    }

    static create(baseURL: string, instance?: AxiosInstance | undefined, authAction?: AuthAction | string): NooNoo {
        if (!instance) instance = axios.create();

        // NooNoo.authAction = authAction;
        // NooNoo.#instance = instance;

        instance.interceptors.request.use((config) => {
            const jwt = localStorage.getItem(JWT_KEY);
            if (jwt) config.headers.Authorization = jwt;
            return config;
        });

        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                const {response} = error;
                if (response && response.status === 401) {
                    localStorage.removeItem(JWT_KEY);
                    console.log('%cSession Expired', 'color:orange;font-weight:bold;');
                }
                return Promise.reject(error);
            }
        );

        return new NooNoo(baseURL, instance, authAction);
    }

    get interceptors() {
        return this.#instance.interceptors;
    }

    get baseURL(): string {
        return this._baseURL;
    }

    create(actionName: string): NooNoo {
        const url = joinPath(this._baseURL, actionName);
        return new NooNoo(url.toString(), this.#instance, this.#authAction);
    }

    reset(url: string): NooNoo {
        return new NooNoo(url, this.#instance, this.#authAction);
    }

    private getRequestUrl(url?: string | number): string {
        return joinPath(this._baseURL, url);
    }

    async refreshToken(): Promise<void> {
        if ((this.#authAction as AuthAction).enableRefreshToken) {
            NooNoo.request = NooNoo.request + 1;
            if (NooNoo.request > 2) {
                NooNoo.request = 0;
                const loginAction = (this.#authAction as AuthAction).action
                await LoginAction.refreshToken(this.#instance, loginAction)
            }
        }
    }

    public async get<T = any, R = AxiosResponse<T>>(
        url?: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        await this.refreshToken()
        return this.#instance.get(this.getRequestUrl(url), config);
    }

    public async post<T = any, R = AxiosResponse<T>>(
        url ?: string,
        data ?: any,
        config ?: AxiosRequestConfig
    ): Promise<R> {
        await this.refreshToken()
        return this.#instance.post(this.getRequestUrl(url), data, config);
    }

    public async put<T = any, R = AxiosResponse<T>>(
        url ?: string,
        data ?: any,
        config ?: AxiosRequestConfig
    ): Promise<R> {
        await this.refreshToken()
        return this.#instance.put(this.getRequestUrl(url), data, config);
    }

    public async delete<T = any, R = AxiosResponse<T>>(
        url?: string,
        config?: AxiosRequestConfig
    ): Promise<R> {
        await this.refreshToken()
        return this.#instance.delete(this.getRequestUrl(url), config);
    }
}
