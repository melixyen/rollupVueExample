var gulp = require('gulp');
const rollup = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const vuePlugin = require('rollup-plugin-vue');
const css = require('rollup-plugin-css-only');


gulp.task('build', async function () {
    await new Promise((resolve, reject) => {
        gulp.src("src/assets/**")
            .pipe(gulp.dest("./dist/assets/"))
            .on("end", resolve);
    });
    
    await new Promise((resolve, reject) => {
        gulp.src("src/html/**")
            .pipe(gulp.dest("./dist/"))
            .on("end", resolve);
    });

    const bundle = await rollup.rollup({
        input: 'src/index.js',
        output: {
            name: 'lui',
            file: 'dist/lui.js',
            format: 'umd'
        },
        plugins: [
            commonjs(),
            css({ output: 'assets/css/lui.css' }),
            vuePlugin({css: false})
        ]
    });

    await bundle.write({
      file: './dist/lui.js',
      format: 'umd',
      name: 'lui',
      sourcemap: true
    });
});
