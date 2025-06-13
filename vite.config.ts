import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/equi-operations-dashboard/',
  server: {
    port: 3003,
    host: true,
    open: true
  }
})