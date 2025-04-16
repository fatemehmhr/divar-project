import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import paths from './src/constants/paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...paths.reduce((accumulator, currrnet) => ({
        ...accumulator,
        [currrnet]: `/${currrnet === "src" ? currrnet : "src/" + currrnet}`
      }), "")

    }
  }

})
