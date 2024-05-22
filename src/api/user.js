import { api } from "./core.js";

export const login = (login, password) => {
  return api.post("/token/", {
    username: login,
    password: password,
  }).then((response) => response.data);
};

export const signin = (username, email, password) => {
  return api.post("/register/", {
    username: username,
    email: email,
    password: password,
  }).then((response) => response.data);
};

export const getMe = () => {
  return api.get("/user/").then((response) => response.data);
};

export const updateUser = (userData) => {
  return api.patch("/user/update/", userData).then((response) => response.data);
};
