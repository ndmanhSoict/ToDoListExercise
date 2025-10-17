import { Link, useNavigate } from '@tanstack/react-router';
import ButtonBasic from './ButtonBasic';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { deleteUser } from '../../store/userSlice';
import LogoIcon from '../../assets/images/logo-icon.png';
import LogoText from '../../assets/images/logo-text.png';

export default function HeaderComponent() {
  const navigate = useNavigate();

  const userName = useSelector((state: RootState) => state.user.userName);
  // console.log(userName);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="sticky top-0 flex justify-around items-center bg-white h-18">
      <div className="flex items-center hover:cursor-pointer" onClick={() => navigate({ to: '/' })}>
        <img className="h-10 w-fit object-cover" src={LogoIcon} alt="img LogoIcon" />
        <img className="h-10 w-fit object-cover" src={LogoText} alt=" img logoText" />
      </div>
      <nav className="flex gap-4 [&>*]:font-semibold [&>*]:hover:underline [&>*]:hover:text-blue-400">
        <Link to="/">Home</Link>
        <Link to="/todo">To Do List</Link>
        <Link to="/about">About</Link>
        <Link to="/test">Test</Link>
      </nav>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div
          className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full 
                  peer dark:bg-gray-600 
                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all 
                  peer-checked:bg-blue-600"
        ></div>
        <span className="ml-3 text-sm font-medium text-gray-900">Enable feature</span>
      </label>
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
          />
          <ButtonBasic
            title="Register"
            className="bg-blue-500 hover:bg-blue-700 py-3 px-8 shadow h-fit"
            onClick={() => {
              navigate({ to: '/register' });
            }}
          />
        </div>
      )}
    </div>
  );
}
