import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 1420,
    strictPort: true,
  },
  clearScreen: false,
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue'],
          'naive-ui': ['naive-ui'],
          'codemirror-core': ['codemirror', '@codemirror/state', '@codemirror/view'],
          'codemirror-lang': ['@codemirror/lang-html', '@codemirror/lang-javascript', '@codemirror/lang-xml']
        }
      }
    }
  }
});
