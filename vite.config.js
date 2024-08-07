import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // sourcemap: false, // Отключение source maps для продакшена
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
});
