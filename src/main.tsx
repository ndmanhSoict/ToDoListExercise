import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
// import { Provider } from 'react-redux';
// import { persistor, store } from './store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import './index.css';

// Import route tree được generate tự động
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

// Khai báo type an toàn
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

//React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Dữ liệu hợp lệ 5 phút
      gcTime: 1000 * 60 * 10, // Giữ cache 10 phút trước khi xóa
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
});

//Kích hoạt tính năng persist
persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 5, // thời gian tối đa cache tồn tại
});

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        {/* <Provider store={store}> */}
        {/* <PersistGate loading={<div>Đang tải dữ liệu...</div>} persistor={persistor}> */}
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" autoClose={2000} />
        <ReactQueryDevtools initialIsOpen={false} />
        {/* </PersistGate> */}
        {/* </Provider> */}
      </QueryClientProvider>
    </StrictMode>,
  );
}
