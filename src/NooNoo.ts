/** That's just an axios wrapper **/
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export default class NooNoo {

  private constructor(private readonly _baseURL: string, private _instance: AxiosInstance) {
    // axiosInstance.interceptors.request.use(config => {
    //   //Todo get from LoginAction, access to localStorage are slow af
    //   const jwt = localStorage.getItem('portofino_jwt');
    //   if (jwt) {
    //     // console.log("%cAuthenticated", "color:green;font-weight:bold;");
    //     config.headers.Authorization = jwt;
    //   } else {
    //     console.log("%cNot Authenticated", "color:orange;font-weight:bold;");
    //   }
    //   return config;
    // });
    //
    // axiosInstance.interceptors.response.use(response => response,
    //         error => {
    //     const {response} = error;
    //     if (response && response.status === 401) {
    //       console.log("%cSession Expired", "color:orange;font-weight:bold;");
    //     }
    //     return Promise.reject(error);
    //   });
  }

  private getRequestUrl(url?: string) {
    return this._baseURL + (url || '');
  }


  public get<T = any, R = AxiosResponse<T>>(url?: string, config?: AxiosRequestConfig): Promise<R> {
    return this._instance.get(this.getRequestUrl(url), config)
  }

  public post<T = any, R = AxiosResponse<T>>(url?: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this._instance.post(this.getRequestUrl(url), data, config)
  }

  public put<T = any, R = AxiosResponse<T>>(url?: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this._instance.put(this.getRequestUrl(url), data, config)
  }

  public delete<T = any, R = AxiosResponse<T>>(url?: string, config?: AxiosRequestConfig): Promise<R> {
    return this._instance.delete(this.getRequestUrl(url), config)
  }

  static create(baseURL: string, instance: AxiosInstance) {
    if (!instance)
      instance = axios.create();
    return new NooNoo(baseURL, instance);
  }

  create(actionName: string) {
    return NooNoo.create(`${this._baseURL}${actionName}/`, this._instance);
  }

}
