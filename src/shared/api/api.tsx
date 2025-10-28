import { queryClient } from '@main';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  async (error) => {
    const { response } = error;
    console.log('config.url:', error);
    // console.log(error.config.data);
    if (!response) {
      console.error('Network Error:', error);
      return Promise.reject(error);
    }
    switch (response.status) {
      case 401:
        console.log('Unauthorized! Please log in again.');
        if (error.config.url.includes('/auth/refresh-token')) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          queryClient.removeQueries({ queryKey: ['userName'] });
          toast.error('Session expired. Please log in again.');
          window.location.href = '/login';
          return;
        } else {
          console.log('da chay vao else');
          toast.info('Refreshing session, please wait...');
          const refreshToken = localStorage.getItem('refreshToken');
          console.log('refreshToken:', refreshToken);
          const refreshResponse = await api.post('/auth/refresh-token', {
            refreshToken: refreshToken ?? '',
          });
          if (refreshResponse) {
            console.log('refreshResponse:', refreshResponse);
            localStorage.setItem('accessToken', refreshResponse.data.data.accessToken);
            localStorage.setItem('refreshToken', refreshResponse.data.data.refreshToken);
            toast.success('Session refreshed successfully! Continuing your request...');
            const newResponse = await api({
              method: error.config.method,
              url: error.config.url,
              data: error.config.data,
            });
            return newResponse;
          }
        }
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
