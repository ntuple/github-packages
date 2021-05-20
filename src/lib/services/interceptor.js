import axios from 'axios';
import ErrorLogger from 'lib/bugsnag/logger';

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  function requestFn(config) {
    return config;
  },
  function errorFn(error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosApiInstance.interceptors.response.use(
  function responseFn(response) {
    return response;
  },
  function errorFn(error) {
    ErrorLogger(error);
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
