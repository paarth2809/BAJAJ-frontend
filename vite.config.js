import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'https://bajaj-ycbu.onrender.com/bfhl', // Allow access from external networks (important for Render)
    port: 3000, // Ensure Vite runs on a known port
    strictPort: true, // Enforce the exact port
    allowedHosts: ['bajaj-frontend-ei5o.onrender.com'], // Add your Render domain
  }
});
