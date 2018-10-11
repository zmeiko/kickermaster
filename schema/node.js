/* eslint-disable global-require */

const { nodeDefinitions, fromGlobalId } = require("graphql-relay");

function assignType(type) {
  return obj => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    if (obj) obj.__type = type;
    return obj;
  };
}

function getType(obj) {
  // eslint-disable-next-line no-underscore-dangle
  return obj ? obj.__type : undefined;
}

module.exports = { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  (globalId, context) => {
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
      case "Game":
        return context.db.Game.findById(id).then(assignType("User"));
      default:
        return null;
    }
  },
  obj => {
    switch (getType(obj)) {
      case "Game":
        return require("./user/GameType").default;
      default:
        return null;
    }
  }
);
