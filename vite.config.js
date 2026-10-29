import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Siden ligger på roten av mariuskhiem.github.io, så base er '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
