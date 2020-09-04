import axios from 'axios';

import store from '../reducers';
import { tokenActions } from '../reducers/token';

const api = axios.create({
  baseURL: 'http://localhost:3333/'
})

api.interceptors.request.use((config) => {

  const token = store.getState().token;

  if (token) {

    config.headers["Authorization"] = "Bearer " + token;

    return config;

  }
  else
    return config;

}, (error) => {

  Promise.reject(error);

});

api.interceptors.response.use((response) => response, (error) => {

  if (error.response.status === 401)
    store.dispatch(tokenActions.LOGOUT());

  return Promise.reject(error);

});

export default api;
