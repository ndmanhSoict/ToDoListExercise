import { Link, useNavigate } from '@tanstack/react-router';
import ButtonBasic from './ButtonBasic';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/strore';
import { deleteUser } from '../../store/userSlice';

export default function HeaderComponent() {
  const navigate = useNavigate();
  const userName = useSelector((state: RootState) => state.user.userName);
  console.log(userName);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex justify-around items-center bg-white">
      <h1 className="!leading-none">TO DO APP</h1>
      <nav className="flex gap-4 [&>*]:font-semibold [&>*]:hover:underline [&>*]:hover:text-blue-400">
        <Link to="/">Home</Link>
        <Link to="/todo">To Do List</Link>
        <Link to="/about">About</Link>
        <Link to="/">Review</Link>
      </nav>
      {userName ? (
        <div>
          <span>
            Hi, {userName} !{' '}
            <button
              className="underline italic hover:cursor-pointer hover:text-blue-400"
              onClick={() => {
                dispatch(deleteUser());
                navigate({ to: '/' });
              }}
            >
              Logout
            </button>
          </span>
        </div>
      ) : (
        <div className="flex gap-2">
          <ButtonBasic
            title="Login"
            className="bg-blue-500 hover:bg-blue-700 px-8 py-3 shadow h-fit"
            onClick={() => {
              navigate({ to: '/login' });
            }}
          ></ButtonBasic>
          <ButtonBasic
            title="Register"
            className="bg-blue-500 hover:bg-blue-700 py-3 px-8 shadow h-fit"
            onClick={() => {
              navigate({ to: '/register' });
            }}
          ></ButtonBasic>
        </div>
      )}
    </div>
  );
}
