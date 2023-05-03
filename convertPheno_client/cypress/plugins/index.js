/**
//  * @type {Cypress.PluginConfig}
//  */

// const { startDevServer } = require("@cypress/webpack-dev-server");
// const webpackCfg = require("../webpack.config.js");

// * codeCoveraTask needs to be switched off for Jenkins build
const codeCoverageTask = require('@cypress/code-coverage/task');

// * useful for debugging
// ! not working when wanting to run component testing
// const logToOutput = require('cypress-log-to-output')

module.exports = (on, config) => {

  // *if cypress should be used for unit testing:
  // *https://docs.cypress.io/guides/tooling/code-coverage#E2E-and-unit-code-coverage

  // *on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
  // *alternative:
  // *on('file:preprocessor', require('@cypress/code-coverage/use-browserify-istanbul'))

  // on("dev-server:start", (options) => {
  //   return startDevServer({
  //     options,
  //     webpackConfig:webpackCfg
  //     // template:
  //     });
  // });
  codeCoverageTask(on, config)
  on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))

  // *useful for debuggig
  // *require('cypress-log-to-output').install(on)
  // *on('task', {
  // *  failed: require('cypress-failed-log/src/failed')(),
  // *})
  // ! not working when wanting to run component testing
  return config;
};
