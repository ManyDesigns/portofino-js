import { AxiosInstance } from 'axios';
import AuthAction from "./AuthAction";

export default interface PortofinoConfig {
  url?: string;
  axiosInstance?: AxiosInstance;

  enableAuth?: boolean;
  authAction?: AuthAction|string;

  crudActionClasses?: string[];
}
