import commonjs from '@rollup/plugin-commonjs';
import vuePlugin from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import pkg from './package.json';
import path from 'path';
import fs from 'fs';

var config = {
	input: 'src/index.js',
	output: {
		name: 'lui',
		file: 'dist/lui.js',
		format: 'umd'
	},
	plugins: [
		commonjs(),
		css({ output: 'assets/css/lui.css' }),
		vuePlugin({css:false})
	]
}



export default config;