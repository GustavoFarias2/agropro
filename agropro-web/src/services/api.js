import axios from 'axios';

import store from '../reducers';

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

}, error => {

  Promise.reject(error);

});

api.interceptors.response.use((response) => {

  if (response.status === 401) {

    

  }

  return response

});

export default api;
