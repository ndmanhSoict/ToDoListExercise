import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import todosReducer from './todosSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
