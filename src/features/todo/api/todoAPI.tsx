import api from '@shared/api/api';
import type { Task } from '@shared/type/TypeTask';

async function getTodosApi() {
  const response = await api.get('/todos?limit=100');
  // console.log('API response:', response);
  return response.data.data.todos;
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
  return response.data.data.todos;
}

async function deleteTodoApi(id: string) {
  const response = await api.delete('/todos/' + id);
  return response.data.data.todos;
}
export { getTodosApi, createNewTodoApi, updateTodoApi, deleteTodoApi };
