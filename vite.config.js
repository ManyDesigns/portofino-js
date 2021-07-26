import path from 'path';
import typescript from '@rollup/plugin-typescript';

module.exports = {
  build: {
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Portofino',
    },
    rollupOptions: {
      plugins: [typescript()],
    },
  },
};
