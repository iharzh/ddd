import axios, { AxiosInstance } from 'axios';
import { Auth, BaseApiUrl } from '../shared/constants/apiRoutes';

export class HttpService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:5000',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('JWT_TOKEN');
        config.headers = config.headers || {};

        if (token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (res: any) => {
        return res;
      },
      async (err: any) => {
        console.log('response interceptor error', { err });

        // handle regular token expiration
        // should return and store new auth token
        const refreshTokenUrl = `${BaseApiUrl}/${Auth.RefreshToken}`;
        if (
          err.response.status === 401 &&
          !err.config._retry &&
          !err.config.url.includes('/refreshToken')
        ) {
          try {
            const res = await this.axiosInstance.post(refreshTokenUrl, {
              refreshToken: localStorage.getItem('REFRESH_TOKEN'),
            });

            console.log({ res: res.data });

            const { token } = res.data;
            localStorage.setItem('JWT_TOKEN', token);

            return this.axiosInstance(err.config);
          } catch (_error) {
            console.log(_error);
            return Promise.reject(_error);
          }
        }

        if (
          err.response.status === 401 &&
          !err.config._retry &&
          err.config.url.includes('/refreshToken')
        ) {
          localStorage.removeItem('JWT_TOKEN');
          localStorage.removeItem('REFRESH_TOKEN');

          window.location.href = 'http://localhost:3000';
        }

        return this.axiosInstance;
      }
    );
  }

  async get<ReturnedType>(url: string): Promise<ReturnedType> {
    return await this.axiosInstance.get(url);
  }

  async post(url: string, data: any) {
    return await this.axiosInstance.post(url, data);
  }
}

export default new HttpService();
