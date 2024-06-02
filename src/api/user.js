import { api } from './core.js';

export const signIn = (username, password) => {
  return api.post('/token/', { username, password }).then(response => response.data);
};

export const signUp = (username, email, password) => {
  return api.post('/register/', { username, email, password }).then(response => response.data);
};

export const getMe = () => {
  return api.get('/user/').then(response => response.data);
};
