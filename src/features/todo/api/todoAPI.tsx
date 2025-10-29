import api from '@shared/api/api';
import type { Task } from '@shared/type/TypeTask';

async function getTodosApi(params?: {
  status?: string;
  priority?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  const response = await api.get('/todos', { params });
  return response.data.data.todos;
}

async function getTodoStats() {
  const response = await api.get('/todos/stats');
  return response.data.data;
}
async function getAllTodosApi() {
  const getStats = await getTodoStats();
  const result = await getTodosApi({ limit: getStats.stats.total });
  return result;
}
async function createNewTodoApi(body: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  assignee: string;
  priority: string;
  status: string;
}) {
  const response = await api.post('/todos', {
    name: body.name,
    description: body.description,
    startDate: body.startDate,
    endDate: body.endDate,
    assignee: body.assignee,
    priority: body.priority,
    status: body.status,
  });
  return response;
}

async function updateTodoApi(body: Omit<Task, 'createdById' | 'createdAt' | 'updatedAt'>) {
  const response = await api.put('/todos/' + body.id, body);
  // console.log('API response:', response);
  return response.data.data;
}

async function deleteTodoApi(id: string) {
  const response = await api.delete('/todos/' + id);
  return response.data.data;
}
export { getTodosApi, createNewTodoApi, updateTodoApi, deleteTodoApi, getAllTodosApi };
