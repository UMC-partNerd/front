import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://api.partnerd.site',  // 백엔드 서버 URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // /api를 제거하여 백엔드로 전달
      },
    },
  },
});
