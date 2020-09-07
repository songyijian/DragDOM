// process.env.NODE_ENV = 'development';

const path = require('path');
const serve = require('rollup-plugin-serve');
const configList = require('./rollup.config');
import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';
const clear = require('rollup-plugin-clear');

const resolve = function(...dir){return path.join(__dirname,`../`, ...dir)};

const host = 'localhost' //'10.131.134.84'
const port = 7001
const openPage = `http://${host}:${7001}/demo/index.html`

setTimeout(() => {
  console.log(`> ${openPage}`)
}, 800);




configList.map((config, index) => {
  config.output.sourcemap = true;

  if( index === 0 ) {
    config.plugins = [
      ...config.plugins,
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify('development'),
      }),
      ...[
        clear({
          targets: ['dist'],
          watch: true, // default: false
        }),
        livereload({
          watch: 'dist'
        }),
        // https://www.npmjs.com/package/rollup-plugin-serve
        serve({
          host,
          port,
          open: true,
          openPage
        })
      ]
    ]
  }

  return config;
})




module.exports = configList;