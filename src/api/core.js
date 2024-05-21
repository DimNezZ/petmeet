import axios from "axios";

export const api = axios.create({
  baseURL: "https://petmeet.space/api",
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
