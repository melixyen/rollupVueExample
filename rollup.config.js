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

// ****** Custom control export config rule start ******
var options = process.argv;//Get cli parameter 取得執行命令帶的參數
var format = 'umd';
options.forEach(function(c, idx, arr){
	if(c=='-f' || c=='--output.format'){
		format = arr[idx+1];
	}
});

config.output.format = format;



export default config;