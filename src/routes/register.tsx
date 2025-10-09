import { createFileRoute } from '@tanstack/react-router';
import RegisterPage from '../features/auth/page/RegisterPage';

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});
