const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
const package = require('../package');

const resolveFile = function(...dir){return path.join(__dirname,`../`, ...dir)};
const moduleName = 'DragDOM'
const pname = package.name
const pversion = package.version


const plugins = [
  commonjs(),
  json(),
  resolve(),
  babel({
    babelrc: false,
    presets: [['@babel/preset-env', { modules: false }] ],
    plugins: [["@babel/plugin-transform-classes", { "loose": true}] ]
  }),
]


module.exports = [
  {
    input: resolveFile('./src/index.js'),
    output: [
      {
        file: resolveFile(`dist/index.js`),
        format: 'cjs',
      }
    ], 
    plugins
  },
  {
    input: resolveFile('./src/index.js'),
    output: [
      {
        file: resolveFile(`dist/${pname}.umd.js`),
        name:moduleName,
        format: 'umd',
      }
    ], 
    plugins
  },
  {
    input: resolveFile('./src/index.js'),
    output: [
      {
        file: resolveFile(`dist/${pname}.iife.${pversion}.js`),
        name:moduleName,
        format: 'iife',
      }
    ], 
    plugins
  }
]