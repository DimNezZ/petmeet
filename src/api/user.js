import { api } from "./core.js";

export const login = (login, password) => {
  return api
    .post("/token/", {
      username: login,
      password: password,
    })
    .then((response) => {
      return response.data;
    });
};

export const signin = (username, email, password) => {
  return api
    .post("/register/", {
      username: username,
      email: email,
      password: password,
    })
    .then(response => response.data);
};
