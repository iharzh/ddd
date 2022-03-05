import axios, { AxiosInstance } from 'axios';

class HttpService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:5000',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('JWT_TOKEN')
        if (token) {
          // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
          // @ts-ignore
          config.headers["x-access-token"] = token; // for Node.js Express back-end
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
        console.log({err});

        if (err.response.status === 401 && !err.config._retry) {
          try {
            const res = await this.axiosInstance.post('http://localhost:5000/auth/refreshToken', {
              refreshToken: localStorage.getItem('REFRESH_TOKEN')
            })

            const { token } = res.data;
            localStorage.setItem('JWT_TOKEN', token)
            err.config._retry = true;

            return this.axiosInstance(err.config);
          } catch (_error) {
              return Promise.reject(_error);
            } finally {
          }
        }

        return this.axiosInstance;
      }
    );
  }

  async get(url: string, data: any) {
    return await this.axiosInstance.get(url, {
      data
    })
  }

  async post(url: string, data: any) {
    return await this.axiosInstance.post(url, data)
  }
}

export default new HttpService();
