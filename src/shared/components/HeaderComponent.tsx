import { Link, useNavigate } from '@tanstack/react-router';
import ButtonBasic from './ButtonBasic';
import LogoIcon from '@assets/images/logo-icon.png';
import LogoText from '@assets/images/logo-text.png';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProfileApi, logoutApi } from '@api/authAPI';
import { queryClient, setTheme } from '@main';
import { toast } from 'react-toastify';
import BurgerIcon from '@assets/icons/burger-menu.svg?react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { LIST_PAGES } from '@shared/constants/PageConstants';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

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

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    setIsDark(saved === 'dark');
  }, []);

  const handleToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    setTheme(newTheme);
  };

  return (
    <div className="sticky top-0 flex justify-around items-center bg-[var(--color-bg)] h-24 sm:h-18 flex-wrap px-12 sm:px-0">
      <div className="flex items-center hover:cursor-pointer" onClick={() => navigate({ to: '/' })}>
        <img className="h-10 w-fit object-cover" src={LogoIcon} alt="img LogoIcon" />
        <img className="h-10 w-fit object-cover" src={LogoText} alt=" img logoText" />
      </div>
      <nav className="hidden sm:flex gap-4 [&>*]:font-semibold [&>*]:text-[var(--color-text)] [&>*]:hover:underline [&>*]:hover:text-blue-400">
        {LIST_PAGES.map((obj) => (
          <Link to={obj.value}>{obj.name}</Link>
        ))}
      </nav>

      {/* <Switch checkedIcon={<LightIcon className='w-8 h-8' />} icon={<DarkIcon className='w-8 h-8' />} /> */}
      <MaterialUISwitch sx={{ m: 1 }} defaultChecked onChange={handleToggle} />

      {userName ? (
        <div>
          <span className="text-[var(--color-text)]">
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
          {LIST_PAGES.map((obj) => (
            <Link to={obj.value} onClick={() => propOpenModalMenu(false)}>
              {obj.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
  return createPortal(modalContent, modalRoot);
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(2px)',
    '&.Mui-checked': {
      // color: '#fff',
      transform: 'translateX(28px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));
