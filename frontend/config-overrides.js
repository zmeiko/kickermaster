const rewireMobX = require("react-app-rewire-mobx");

const rewireCssModules = require("react-app-rewire-css-modules");

/* config-overrides.js */
module.exports = function override(config, env) {
  // use the MobX rewire
  config = rewireMobX(config, env);
  config = rewireCssModules(config, env);

  return config;
};
