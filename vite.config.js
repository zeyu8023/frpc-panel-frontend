import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), // ?? 不传 jsxRuntime，使用默认 classic 模式
  ],
});
