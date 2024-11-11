import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api1': {
        target: 'https://noteb.com/api/webservice.php',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, '')
      },
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})





