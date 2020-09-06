const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
const package = require('../package');
const pname = package.name
const pversion = package.version
const resolveFile = function(...dir){return path.join(__dirname,`../`, ...dir)};


const plugins = [
  commonjs(),
  json(),
  resolve(),
  babel({
    // babelrc: false,
    presets: [['@babel/preset-env', { modules: false }] ],
    plugins: [["@babel/plugin-transform-classes", { "loose": true}] ]
  }),
]


module.exports = [
  {
    input: resolveFile('./src/index.js'),
    output: [
      {
        file: resolveFile(`dist/${pname}.cjs.${pversion}.js`),
        format: 'cjs',
      }
    ], 
    plugins
  },
  // {
  //   input: resolveFile('./src/index.js'),
  //   output: [
  //     {
  //       file: resolveFile(`dist/${pname}.iife.${pversion}.js`),
  //       format: 'iife',
  //     }
  //   ], 
  //   plugins
  // },
  {
    input: resolveFile('./src/iife.js'),
    output: [
      {
        file: resolveFile(`dist/${pname}.umd.js`),
        format: 'iife',
      }
    ], 
    plugins
  }
]