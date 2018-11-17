const { rule, shield } = require("graphql-shield");

const isAuthenticated = rule()(async (parent, args, { isAuthenticated }) => {
  return isAuthenticated;
});

module.exports = shield({
  Query: {}
});
