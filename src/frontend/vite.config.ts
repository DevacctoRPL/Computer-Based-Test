import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      treeshake: true, // Ensure tree-shaking is enabled
    },
  },
  plugins: [
    react(),
    nodePolyfills(),
  ],
})
