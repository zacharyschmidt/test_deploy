import axios from 'axios';

export const setAxiosDefaultAutorization = (token: string) => {
  axios.defaults.headers.common['Autorization'] = `Bearer ${token}`;
};

export const setLocalStorageAuthToken = (token: string) => {
  localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE as string, token);
};

export const getLocalStorageAuthToken = () => {
  return localStorage.getItem(process.env.REACT_APP_LOCAL_TOKEN as string);
};

export const removeAuthToken = () => {
  localStorage.removeItem(process.env.REACT_APP_LOCAL_TOKEN as string);
  delete axios.defaults.headers.common['Authorization'];
};

export const setAuthToken = (token: string) => {
  setAxiosDefaultAutorization(token);
  setLocalStorageAuthToken(token);
};
