import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://api.partnerd.site', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  
      },
    },
  },

  // 채팅
  define: {
    global: "window"
  }
})