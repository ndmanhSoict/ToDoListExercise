import { createFileRoute, redirect } from '@tanstack/react-router';
import ToDoPageVer2 from '@features/todo/page/ToDoPageVer2';
import { toast } from 'react-toastify';
// import { queryClient } from '../main';

export const Route = createFileRoute('/todo')({
  beforeLoad: () => {
    const user = localStorage.getItem('userName');
    const accessToken = localStorage.getItem('accessToken');
    if (!user || !accessToken) {
      if (!toast.isActive('error-login-before-start')) {
        toast.error('Please login before start!', { toastId: 'error-login-before-start' });
      }
      // toast.error('Please login before start!');
      throw redirect({ to: '/login' });
    }
  },
  component: () => (
    <>
      <ToDoPageVer2 />
    </>
  ),
});
