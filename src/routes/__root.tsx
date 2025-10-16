import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import HeaderComponent from '../shared/components/HeaderComponent';

const RootLayout = () => (
  <>
    <div className="bg-[url(./assets/images/bg.png)] bg-cover bg-fixed min-h-screen absolute top-0 left-0 right-0 -z-10">
      <HeaderComponent></HeaderComponent>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  </>
);

export const Route = createRootRoute({ component: RootLayout });
