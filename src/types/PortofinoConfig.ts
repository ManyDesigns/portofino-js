import { AxiosInstance } from 'axios';

export default interface PortofinoConfig {
  url?: string;
  axiosInstance?: AxiosInstance;

  enableAuth?: boolean;
  authAction?: string;

  crudActionClasses?: string[];
}
