const rewireMobX = require("react-app-rewire-mobx");
const { injectBabelPlugin } = require("react-app-rewired");
const rewireCssModules = require("react-app-rewire-css-modules");

/* config-overrides.js */
module.exports = function override(config, env) {
  // use the MobX rewire
  config = injectBabelPlugin("relay", config);
  config = rewireMobX(config, env);
  config = rewireCssModules(config, env);

  return config;
};
