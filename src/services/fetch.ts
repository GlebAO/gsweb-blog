import axios from 'axios';

const publicFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const authFetch = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

authFetch.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const code = error && error.response ? error.response.status : 0;
    if (code === 401 || code === 403) {
      console.log('error code', code);
    }
    return Promise.reject(error);
  }
);

export { publicFetch, authFetch };