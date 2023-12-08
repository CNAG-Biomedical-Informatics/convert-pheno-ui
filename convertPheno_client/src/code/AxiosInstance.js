import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

axiosInstance.interceptors.request.use(config => {
  if (window.location.hostname.endsWith('.github.dev') ) {
    console.log('Running in Codespaces');
    config.headers['X-Github-Token'] = import.meta.env.VITE_GITHUB_TOKEN;
  }
  console.log('config', config);
  return config;
}, error => {
  console.log('error', error);
  return Promise.reject(error);
});

export default axiosInstance;
