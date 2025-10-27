import api from '@shared/api/api';
import { queryClient } from '../../../main';

async function loginApi(userData: { username: string; password: string }) {
  const response = await api.post('/auth/login', {
    username: userData.username,
    password: userData.password,
  });
  return response;
}

async function registerApi(registerData: {
  username: string;
  password: string;
  confirmPassword: string;
}) {
  const response = await api.post('/auth/register', {
    username: registerData.username,
    password: registerData.password,
    confirmPassword: registerData.confirmPassword,
  });
  return response;
}

async function logoutApi() {
  try {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    queryClient.setQueryData(['userName'], null);
    return response;
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

async function getProfileApi() {
  const response = await api.get('/auth/profile');
  return response;
}

export { loginApi, registerApi, logoutApi, getProfileApi };
