import axios from 'axios';
import { LS, LSKeys } from '../local-store';

export const AX = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const token = LS.getItem(LSKeys.AuthToken, '');

if (token) {
  AX.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// AX.interceptors.response.use(
//   response => response,
//   (error: AxiosError) => {
//     // whatever you want to do with the error
//     const errors = (error.response?.data as ResponseError['data'])?.errors ?? {};

//     isDev && console.debug('errors', error.toJSON());

//     logoutOnError(errors);
//     throw error;
//   },
// );
