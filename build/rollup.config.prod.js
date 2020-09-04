// process.env.NODE_ENV = 'production';
const { uglify } = require('rollup-plugin-uglify');
const configList = require('./rollup.config');
import replace from 'rollup-plugin-replace';


configList.map((config, index) => {
  config.output.sourcemap = false;
  config.plugins = [
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify('production'),
    }),
    ...config.plugins,
    ...[
      uglify()
    ]
  ]
  return config;
})

module.exports = configList;
