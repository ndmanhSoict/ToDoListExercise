import { createFileRoute, redirect } from '@tanstack/react-router';
import ToDoPage from '../features/todo/page/ToDoPage';
import { store } from '../store/store';
export const Route = createFileRoute('/todo')({
  beforeLoad: () => {
    const user = store.getState().user;
    // console.log(user)
    sessionStorage.setItem('toastMessage', 'Vui lòng đăng nhập trước!');
    console.log('da luu session');
    if (!user.userName) throw redirect({ to: '/login' });
  },
  component: () => (
    <>
      <ToDoPage />
    </>
  ),
});
