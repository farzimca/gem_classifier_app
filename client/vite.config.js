import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': "https://gemx-backend.vercel.app"  // modify this to backend link in production
    },
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})