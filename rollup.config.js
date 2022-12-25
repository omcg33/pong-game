import resolve from '@rollup/plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify';
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: './src/index.ts',
    
    output: {
        file: './dist/index.js',
        format: 'iife',
    },
    plugins: [
        resolve({
            preferBuiltins: true,
            extensions: ['.js'],
          }),
          commonjs(),
          typescript({
            tsconfig: './tsconfig.json'
          }),
        //   uglify(),
    ]
  };