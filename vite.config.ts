import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: "0.0.0.0", // Accept connections from outside the container
    port: 4173
  },
  server: {
    host: "0.0.0.0", // Accept connections during development mode too
    port: 3000
  }
})
