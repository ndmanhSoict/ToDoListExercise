import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    {
      return response;
    }
  },
  (error) => {
    const { response } = error;
    if (!response) {
      console.error('Network Error:', error);
      return Promise.reject(error);
    }
    switch (response.status) {
      case 401:
        console.log('Unauthorized! Please log in again.');
        break;
      case 403:
        console.log('Forbidden! You do not have permission to access this resource.');
        break;
      case 500:
        console.log('Server Error! Please try again later.');
        break;
      default:
        console.log(`Error ${response.status}: ${response.data?.message || response.statusText}`);
    }
    return Promise.reject(error);
  },
);
export default api;
