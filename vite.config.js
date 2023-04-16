import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import wasm from 'vite-plugin-wasm';
import path from 'path';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import typescript from '@rollup/plugin-typescript';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig(({ command, mode }) => {
  return {
    assetsInclude: ['**/*.tflite'],
    plugins: [tsconfigPaths(), wasm()],
    resolve: {
      alias: {
        babylonjs:
          mode === 'development' ? 'babylonjs/babylon.max' : 'babylonjs',
      },
    },
    optimizeDeps: {
      disabled: true,
    },
    build: {
      commonjsOptions: { include: [], transformMixedEsModules: true },
      manifest: true,
      minify: false,
      reportCompressedSize: true,
      lib: {
        entry: path.resolve(__dirname, './src/main.ts'),
        fileName: 'main',
        name: 'main',
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: [],
        plugins: [
          typescriptPaths({
            preserveExtensions: true,
          }),
          typescript({
            sourceMap: false,
            declaration: true,
            outDir: 'dist',
          }),
        ],
      },
    },
  };
});

// import inject from '@rollup/plugin-inject';
// import { resolve } from 'path';

// export default defineConfig({
//   plugins: [wasm(), tsconfigPaths()],
//   optimizeDeps: {},
//   resolve: {
//     alias: {},
//   },
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, './src/main.ts'),
//       fileName: 'main',
//       name: 'main',
//       formats: ['es', 'cjs'],
//     },
//     rollupOptions: {
//       plugins: [inject({ Buffer: ['Buffer', 'Buffer'], process: 'process' })],
//       input: {
//         main: resolve(__dirname, 'index.html'),
//       },
//     },
//     commonjsOptions: {
//       transformMixedEsModules: true, // https://github.com/chnejohnson/vue-dapp/issues/20
//     },
//   },
//   define: {},
// });
