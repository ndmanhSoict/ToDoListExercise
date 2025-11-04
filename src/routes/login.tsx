import { createFileRoute, redirect } from '@tanstack/react-router';
import LoginPage from '@features/auth/page/LoginPage';
import { queryClient } from '@main';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const user = queryClient.getQueryData<{ userName: string }>(['userName']);
    if (user) {
      throw redirect({ to: '/todo' });
    }
  },
  component: LoginPage,
});
