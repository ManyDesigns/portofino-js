/** That's just an axios wrapper **/
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { joinPath } from './lib/utils';

export default class NooNoo {
  private static _instance: AxiosInstance;

  private constructor(private readonly _baseURL: string) {}

  static create(baseURL: string, instance?: AxiosInstance | undefined): NooNoo {
    if (!instance) instance = axios.create();

    NooNoo._instance = instance;

    NooNoo._instance.interceptors.request.use((config) => {
      const jwt = localStorage.getItem('portofino_jwt');
      if (jwt) config.headers.Authorization = jwt;
      return config;
    });

    NooNoo._instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        if (response && response.status === 401) {
          localStorage.removeItem('portofino_jwt');
          console.log('%cSession Expired', 'color:orange;font-weight:bold;');
        }
        return Promise.reject(error);
      }
    );

    return new NooNoo(baseURL);
  }

  create(actionName: string): NooNoo {
    const url = joinPath(this._baseURL, actionName);
    return new NooNoo(url.toString());
  }

  private getRequestUrl(url?: string | number): string {
    return joinPath(this._baseURL, url);
  }

  public get<T = any, R = AxiosResponse<T>>(
    url?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return NooNoo._instance.get(this.getRequestUrl(url), config);
  }

  public post<T = any, R = AxiosResponse<T>>(
    url?: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return NooNoo._instance.post(this.getRequestUrl(url), data, config);
  }

  public put<T = any, R = AxiosResponse<T>>(
    url?: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return NooNoo._instance.put(this.getRequestUrl(url), data, config);
  }

  public delete<T = any, R = AxiosResponse<T>>(
    url?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return NooNoo._instance.delete(this.getRequestUrl(url), config);
  }
}
