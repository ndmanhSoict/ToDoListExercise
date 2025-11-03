import { createFileRoute, redirect } from '@tanstack/react-router';
import ToDoPage from '@features/todo/page/ToDoPage';
import { toast } from 'react-toastify';
import { queryClient } from '../main';

export const Route = createFileRoute('/todo')({
  beforeLoad: () => {
    const user = queryClient.getQueryData<{ userName: string }>(['userName']);
    if (!user) {
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
