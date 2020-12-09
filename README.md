# rollupVueExample
Use gulp with rollup to package a Vue project

# Install

```shell
npm install -g gulp

npm install -g rollup

npm install
```

# Directory

## source

The example sources code put on src.

## Vue component

every component is a directory under components. Must with a .vue file, an index.js, maybe css or scss file to import.

## Command

If you just want package the component, run
```shell
npm run pack
```
It will call rollup to package your Vue components  


If you want build vue component with gulp, try
```shell
gulp build
```
You can add gulp-rollup to your gulp task.

## Dist

Gulp will copy html and build javascript file to dist folder, also include assets.