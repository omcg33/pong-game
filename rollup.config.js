import resolve from '@rollup/plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify';
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: './js/main.js',
    
    output: {
        file: './dist/main.js',
        format: 'iife',
    },
    plugins: [
        resolve({
            preferBuiltins: true,
            extensions: ['.js'],
          }),
          commonjs(),
        //   uglify(),
    ]
  };