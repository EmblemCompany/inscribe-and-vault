import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/inscribe-and-vault/',
  plugins: [vue()],
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
})
