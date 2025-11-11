import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/assistaos-landing/',
  server: {
    port: 3005,
    open: true
  }
})
