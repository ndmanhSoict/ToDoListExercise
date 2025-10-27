import api from '@shared/api/api';

async function getTodosApi() {
  const response = await api.get('/todos?limit=100');
  // console.log('API response:', response);
  return response.data.data.todos;
}

export { getTodosApi };
