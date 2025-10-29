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
    if (!response) {
      console.error('Network Error:', error);
      return Promise.reject(error);
    }
    switch (response.status) {
      case 401:
        if (
          error.config.url.includes('/auth/login') ||
          error.config.url.includes('/auth/logout') ||
          error.config.url.includes('/auth/register')
        ) {
          return Promise.reject(error);
        }
        if (error.config.url.includes('/auth/refresh-token')) {
          localStorage.clear();
          queryClient.clear();
          toast.error('Session expired. Redirecting to login...');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
          return;
        } else {
          toast.info('Refreshing session, please wait...');
          const refreshToken = localStorage.getItem('refreshToken');
          const refreshResponse = await api.post('/auth/refresh-token', {
            refreshToken: refreshToken ?? '',
          });
          if (refreshResponse) {
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
          return;
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
