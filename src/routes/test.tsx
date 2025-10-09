import { createFileRoute } from '@tanstack/react-router';
import ToDoPage from '../features/todo/page/ToDoPage';
export const Route = createFileRoute('/test')({
  component: () => (
    <>
      <ToDoPage />
    </>
  ),
});
