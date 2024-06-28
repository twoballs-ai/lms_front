import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // This line sets up aliasing
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable source maps for production
  },
  server: {
    port: 3000,
  },
});