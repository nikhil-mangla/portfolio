import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react()],
  base: "/nikhil_mangla_portfolio",
  server: {
    headers: {
      "Permissions-Policy": "interest-cohort=()"
    }
  }
})
