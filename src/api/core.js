import axios from "axios";
import { useUserStore } from "../store/useUserStore.js";

const api = axios.create({
  baseURL: "https://petmeet.space/api",
});

api.interceptors.request.use(config => {
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers["Authorization"] = `Bearer ${userStore.token}`;
  }
  return config;
});

api.interceptors.response.use(response => response, async error => {
  const userStore = useUserStore();
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      // Обновить токен
      const response = await api.post('/refresh-token/', {
        refresh: userStore.refreshToken
      });
      userStore.setToken(response.data.access);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access;
      return api(originalRequest);
    } catch (err) {
      userStore.clearUser();
      return Promise.reject(err);
    }
  }
  return Promise.reject(error);
});

export { api };