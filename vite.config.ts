import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'node:path';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    svgLoader({
      defaultImport: 'component',
      svgoConfig: {
        plugins: ['removeDimensions'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/global.scss";',
      },
    },
  },
  build: {
    minify: 'terser',
    copyPublicDir: false,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'lib/constanta.ts'),
      name: '@constanta/vue3',
      fileName: 'constanta',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
      plugins: [
        del({ hook: 'writeBundle', targets: ['dist/style.css'] }),
        copy({
          hook: 'writeBundle',
          targets: [
            { src: 'src/styles', dest: 'dist' },
            { src: 'src/utils', dest: 'dist' },
          ],
        }),
      ],
    },
  },
});
