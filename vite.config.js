// vite.config.js
/* global __dirname */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
  build: {
    ssr: true,
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js'),
      },
      output: {
        dir: resolve(__dirname, 'dist'),
        entryFileNames: () => {
          let out = pkg.name;
          return `${out}.js`;
        },
      },
    },
    copyPublicDir: false,
  },
});
