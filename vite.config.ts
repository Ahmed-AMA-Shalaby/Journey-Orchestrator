import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['./src/__tests__/unit/**/*.test.ts(x)'],
    setupFiles: './src/__tests__/unit/utils/setupTests.ts',
  },
  resolve: {
    alias: {
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/models': path.resolve(__dirname, './src/models'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/tests': path.resolve(__dirname, './src/__tests__'),
    },
  },
});
