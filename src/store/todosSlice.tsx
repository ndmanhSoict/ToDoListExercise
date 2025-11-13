import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '@shared/type/TypeTask';
import {
  createNewTodoApi,
  deleteTodoApi,
  getAllTodosApi,
  updateTodoApi,
} from '@features/todo/api/todoAPI';

export const getAllTodos = createAsyncThunk('todos/getTodos', async () => {
  const response = await getAllTodosApi();
  // console.log('response: ', response);
  return response;
});

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (TaskUpdate: Omit<Task, 'createdById' | 'createdAt' | 'updatedAt'>) => {
    const response = await updateTodoApi(TaskUpdate);
    // console.log('response: ', response);
    return response;
  },
);

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
  const response = await deleteTodoApi(id);
  // console.log('response: ', response);
  return response;
});

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (task: Omit<Task, 'id' | 'createdById' | 'createdAt' | 'updatedAt'>) => {
    const response = await createNewTodoApi(task);
    // console.log('response: ', response);
    return response;
  },
);

interface TodosState {
  data: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  data: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Task[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- getAllTodos ----
      .addCase(getAllTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.loading = false;
        // console.log('action: ', action);
        state.data = action.payload;
      })
      .addCase(getAllTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load todos';
      })

      // ---- updateTodo ----
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update todo';
      })

      // ---- deleteTodo -----
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete todo';
      })

      // ----addTodo ----
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add new todo';
      });
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
