import axios from 'axios';
import { store } from '~/store';
import { signOut } from '~/store/modules/auth/actions';

const UNAUTHORIZED = 401;

const api = axios.create({
  baseURL: 'http://localhost:3339',
});

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error.response.status === UNAUTHORIZED) {
      store.dispatch(signOut());
    }
    return Promise.reject(error);
  }
);

export default api;
