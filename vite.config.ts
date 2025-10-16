import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'recharts-vendor': ['recharts'],
          'zustand-vendor': ['zustand'],
        },
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize for production
    minify: 'esbuild',
    // Generate source maps for debugging
    sourcemap: false,
    // Target modern browsers for smaller bundle size
    target: 'es2015',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'zustand', 'recharts'],
  },
  // Server configuration
  server: {
    port: 3000,
    strictPort: false,
    open: true,
  },
  // Preview configuration
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
  },
});
