import { createFileRoute, redirect } from '@tanstack/react-router';
import ToDoPage from '../features/todo/page/ToDoPage';
import { store } from '@store/store';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/todo')({
  beforeLoad: () => {
    const user = store.getState().user;
    if (!user.userName) {
      if (!toast.isActive('error-login-before-start')) {
        toast.error('Please login before start!', { toastId: 'error-login-before-start' });
      }
      // toast.error('Please login before start!');
      throw redirect({ to: '/login' });
    }
  },
  component: () => (
    <>
      <ToDoPage />
    </>
  ),
});
