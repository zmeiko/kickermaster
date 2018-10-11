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
        return context.db.Game.findById(id).then(assignType("Game"));
      case "Goal":
        return context.db.Goal.findById(id).then(assignType("Goal"));
      case "User":
        return context.db.Goal.findById(id).then(assignType("User"));
      default:
        return null;
    }
  },
  obj => {
    switch (getType(obj)) {
      case "Game":
        return require("./game/GameType").default;
      case "Goal":
        return require("./goal/GoalType").default;
      case "User":
        return require("./goal/GoalType").default;
      default:
        return null;
    }
  }
);
