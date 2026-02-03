/* global __dirname */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Development server proxy to forward /api requests to backend and avoid CORS issues
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'https://unda-youth-network-backend.onrender.com',
        changeOrigin: true,
        secure: false,
        // keep path as-is (frontend calls /api/... and proxy forwards to target/api/...)
      }
    }
  }
})
