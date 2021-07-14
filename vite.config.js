import path from 'path';
import typescript from '@rollup/plugin-typescript';

module.exports = {
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Portofino'
    },
    rollupOptions: {
      plugins: [typescript()]
    }
  }
};
