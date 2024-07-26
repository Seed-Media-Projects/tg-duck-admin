import axios, { AxiosError } from 'axios';
import { LS, LSKeys } from '../local-store';
import { signout } from '../login/signout';

export const AXDUCK = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
export const AXPRICE = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL_PRICEME,
});

const token = LS.getItem(LSKeys.AuthToken, '');

if (token) {
  AXDUCK.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  AXPRICE.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

AXDUCK.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    console.debug('errors', error.toJSON());
    if (error.response?.status === 401) {
      signout();
      window.location.replace('/login');
    }

    throw error;
  },
);
AXPRICE.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    console.debug('errors', error.toJSON());
    if (error.response?.status === 401) {
      signout();
      window.location.replace('/login');
    }

    throw error;
  },
);
