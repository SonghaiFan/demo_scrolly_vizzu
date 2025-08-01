import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

export default [
  // Main library build
  {
    input: 'src/lib/ScrollyVizzu.js',
    output: [
      {
        file: packageJson.main,
        format: 'umd',
        name: 'ScrollyVizzu',
        sourcemap: true,
        globals: {
          'vizzu': 'Vizzu',
          'd3': 'd3'
        }
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    external: ['vizzu', 'd3'],
    plugins: [
      resolve(),
      commonjs(),
      terser()
    ]
  },
  
  // Minified version
  {
    input: 'src/lib/ScrollyVizzu.js',
    output: {
      file: 'dist/scrolly-vizzu.min.js',
      format: 'umd',
      name: 'ScrollyVizzu',
      sourcemap: true,
      globals: {
        'vizzu': 'Vizzu',
        'd3': 'd3'
      }
    },
    external: ['vizzu', 'd3'],
    plugins: [
      resolve(),
      commonjs(),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      })
    ]
  },
  
  // TypeScript definitions
  {
    input: 'src/lib/ScrollyVizzu.js',
    output: {
      file: packageJson.types,
      format: 'esm'
    },
    plugins: [dts()]
  }
]; 