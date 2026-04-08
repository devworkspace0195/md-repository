import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { publishPlugin } from './vite-plugin-publish'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), publishPlugin()],
  base: process.env.VITE_BASE_URL ?? '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
