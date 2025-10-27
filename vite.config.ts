import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@schemas': path.resolve(__dirname, 'src/features/auth/schemas'),
      '@api': path.resolve(__dirname, 'src/features/auth/api'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@fakeTastList': path.resolve(__dirname, 'src/fakeTastList'),
      '@main': path.resolve(__dirname, 'src/main'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@type': path.resolve(__dirname, 'src/shared/type'),
    },
  },
});
