import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from '@/utils/user';
import axios, { isAxiosError } from 'axios';

export const api = axios.create({
  baseURL: 'https://petmeet.space/api',
});

api.interceptors.request.use(config => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

let isInterceptorUsed = false;

const createRefreshTokenInterceptor = () => {
  if (isInterceptorUsed) {
    return;
  }

  const interceptor = api.interceptors.response.use(
    response => response,
    async error => {
      if (isAxiosError(error)) {
        if (error.response?.status !== 401) {
          return Promise.reject(error);
        }

        const refreshToken = getRefreshToken();
        if (refreshToken !== null) {
          api.interceptors.response.eject(interceptor);
          isInterceptorUsed = false;

          return api
            .post('/token/refresh/', { refresh: refreshToken })
            .then(response => {
              setAccessToken(response.data.access);

              error.response.config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
              return api(error.response.config);
            })
            .catch(error => {
              removeAccessToken();
              removeRefreshToken();

              location.reload();

              return Promise.reject(error);
            })
            .finally(() => {
              createRefreshTokenInterceptor();
            });
        } else {
          location.reload();
        }
      }

      return Promise.reject(error);
    }
  );

  isInterceptorUsed = true;
};

createRefreshTokenInterceptor();
