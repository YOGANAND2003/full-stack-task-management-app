import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './index.html', // Ensure this points to the correct HTML file, usually the entry point
    },
  },
});
