import { Link, useNavigate } from '@tanstack/react-router';
import ButtonBasic from './ButtonBasic';
import LogoIcon from '@assets/images/logo-icon.png';
import LogoText from '@assets/images/logo-text.png';
import { useQuery } from '@tanstack/react-query';
import { getProfileApi, logoutApi } from '@api/authAPI';
import { queryClient } from '@main';
import { toast } from 'react-toastify';

export default function HeaderComponent() {
  const navigate = useNavigate();
  const { data: userName } = useQuery({
    queryKey: ['userName'],
    queryFn: async () =>
      await getProfileApi().then((res) =>
        res.data.data.user.username.slice(0, res.data.data.user.username.indexOf('@')),
      ),
    enabled: !!localStorage.getItem('accessToken'),
    staleTime: 300000, // 5 phút
  });

  // const userName = queryClient.getQueryData<string>(['userName']);
  // console.log('userName header là: ', userName);

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
            Hi, {userName} !
            <button
              className="underline italic hover:cursor-pointer hover:text-blue-400 pl-2"
              onClick={() => {
                logoutApi();
                queryClient.setQueryData(['userName'], null);
                queryClient.clear();
                localStorage.clear();
                toast.success('Logged out successfully!');
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
