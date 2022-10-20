import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

export default {
  input: './packages/index.ts',
  output: {
    file: './lib/litecase-ui.min.js',
    format: 'es',
    name: 'LitecaseUI',
    globals,
  },
  external: Object.keys(globals),
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
    terser(),
    babel({
      babelHelpers: 'bundled', // runtime or bundled
      exclude: '**/node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
};
