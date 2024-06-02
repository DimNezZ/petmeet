export const getAccessToken = () => {
  return localStorage.getItem('access');
};

/**
 * @param {string} value
 */
export const setAccessToken = value => {
  return localStorage.setItem('access', value);
};

export const removeAccessToken = () => {
  return localStorage.removeItem('access');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refresh');
};

/**
 * @param {string} value
 */
export const setRefreshToken = value => {
  return localStorage.setItem('refresh', value);
};

export const removeRefreshToken = () => {
  return localStorage.removeItem('refresh');
};

export const isAuthorized = () => {
  return getAccessToken() !== null;
};
