var wallabyWebpack = require('wallaby-webpack');
var wallabyPostprocessor = wallabyWebpack({});

module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'node_modules/babel-polyfill/browser.js', instrument: false},
      {pattern: 'src/**/*.js', load: false},
      {pattern: 'test/unit/setup.js', load: false}
    ],
    tests: [
      {pattern: 'test/unit/**/*.spec.js', load: false}
    ],

    compilers: {
      '**/*.js*': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['es2015', 'stage-1'],
        plugins: [
          'syntax-flow',
          'transform-decorators-legacy',
          'transform-flow-strip-types'
        ]
      })
    },

    postprocessor: wallabyPostprocessor,

    bootstrap: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
