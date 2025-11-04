import { Link, useNavigate } from '@tanstack/react-router';
import ButtonBasic from './ButtonBasic';
import LogoIcon from '@assets/images/logo-icon.png';
import LogoText from '@assets/images/logo-text.png';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProfileApi, logoutApi } from '@api/authAPI';
import { queryClient } from '@main';
import { toast } from 'react-toastify';
import BurgerIcon from '@assets/icons/burger-menu.svg?react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export default function HeaderComponent() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const { data: userName } = useQuery({
    queryKey: ['userName'],
    queryFn: async () =>
      await getProfileApi().then((res) =>
        res.data.data.user.username.slice(0, res.data.data.user.username.indexOf('@')),
      ),
    enabled: !!localStorage.getItem('accessToken'),
    staleTime: 300000, // 5 phút
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await logoutApi();
    },
    onSuccess: () => {
      queryClient.setQueryData(['userName'], null);
      queryClient.clear();
      localStorage.clear();
      toast.success('Logged out successfully!');
      navigate({ to: '/' });
    },
  });
  // const userName = queryClient.getQueryData<string>(['userName']);
  // console.log('userName header là: ', userName);

  return (
    <div className="sticky top-0 flex justify-around items-center bg-white h-24 sm:h-18 flex-wrap px-12 sm:px-0">
      <div className="flex items-center hover:cursor-pointer" onClick={() => navigate({ to: '/' })}>
        <img className="h-10 w-fit object-cover" src={LogoIcon} alt="img LogoIcon" />
        <img className="h-10 w-fit object-cover" src={LogoText} alt=" img logoText" />
      </div>
      <nav className="hidden sm:flex gap-4 [&>*]:font-semibold [&>*]:hover:underline [&>*]:hover:text-blue-400 ">
        <Link to="/">Home</Link>
        <Link to="/todo">To Do List</Link>
        <Link to="/about">About</Link>
        <Link to="/test">Test</Link>
      </nav>
      <label className="relative hidden md:inline-flex items-center cursor-pointer">
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
              onClick={() => logoutMutation.mutate()}
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
      <BurgerIcon
        className="absolute right-0 w-12 h-12 sm:hidden hover:cursor-pointer"
        onClick={() => setOpenMenu(true)}
      />
      {openMenu && <ModalMenu propOpenModalMenu={setOpenMenu} />}
    </div>
  );
}

function ModalMenu({ propOpenModalMenu }: { propOpenModalMenu: (value: boolean) => void }) {
  const modalContent = (
    <div
      className="absolute top-0 right-0 h-screen w-screen bg-gray-300/40"
      onClick={() => propOpenModalMenu(false)}
    >
      <div
        className="absolute right-0 top-12 sm:top-9 h-fit w-1/2 max-w-xs bg-white shadow-lg p-6 flex flex-col gap-4 rounded-l-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col gap-4 font-semibold [&>*]:p-2 [&>*]:hover:text-blue-400 [&>*]:hover:underline">
          <Link to="/" onClick={() => propOpenModalMenu(false)}>
            Home
          </Link>
          <Link to="/todo" onClick={() => propOpenModalMenu(false)}>
            To Do List
          </Link>
          <Link to="/about" onClick={() => propOpenModalMenu(false)}>
            About
          </Link>
          <Link to="/test" onClick={() => propOpenModalMenu(false)}>
            Test
          </Link>
        </nav>
      </div>
    </div>
  );
  return createPortal(modalContent, modalRoot);
}
