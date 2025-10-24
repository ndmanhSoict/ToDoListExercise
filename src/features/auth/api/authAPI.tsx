import api from '@shared/api/api';

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
  const response = await api.post('/auth/logout');
  return response;
}
export { loginApi, registerApi, logoutApi };
