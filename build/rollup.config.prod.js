// process.env.NODE_ENV = 'production';
const { uglify } = require('rollup-plugin-uglify');
const configList = require('./rollup.config');
const replace = require('rollup-plugin-replace');
const clear = require('rollup-plugin-clear');


configList.map((config, index) => {
  config.output.sourcemap = false;

  config.plugins = [
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify('production'),
    }),
    ...config.plugins,
    ...[
      index === 0 && clear({
        targets: ['dist'],
        watch: true, // default: false
      }),
      uglify()
    ]
  ]

  return config;
})

module.exports = configList;
