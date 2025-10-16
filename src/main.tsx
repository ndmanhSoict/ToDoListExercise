import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import route tree được generate tự động
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

// Khai báo type an toàn
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

//React Query
const queryClient = new QueryClient();

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={<div>Đang tải dữ liệu...</div>} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
