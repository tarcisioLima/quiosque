import axios from 'axios';
import { store } from '~/store';
import { signOut } from '~/store/modules/auth/actions';
import { message } from 'antd';

const UNAUTHORIZED = 401;

const api = axios.create({
  baseURL: 'http://localhost:3339',
});

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if(error.toJSON().message === 'Network Error'){
      message.error('O servidor está desligado, por favor, ative-o antes de acessar!')
    }
    if (error.response && error.response.status === UNAUTHORIZED) {
      store.dispatch(signOut());
    }
    return Promise.reject(error);
  }
);

export default api;
