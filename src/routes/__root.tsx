import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => (
  <>
    <div className="bg-[url(./assets/images/bg.jpg)] bg-cover min-h-screen absolute top-0 left-0 right-0 -z-10 bg-color-[rgba(0,0,0,0.5)]">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  </>
);

export const Route = createRootRoute({ component: RootLayout });
