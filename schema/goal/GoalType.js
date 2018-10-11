const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString
} = require("graphql");
const { globalIdField } = require("graphql-relay");
const { nodeInterface } = require("../node");

module.exports = new GraphQLObjectType({
  name: "Goal",
  interfaces: [nodeInterface],

  fields: () => ({
    id: globalIdField(),
    ownGoal: {
      type: GraphQLBoolean
    },
    Game: {
      type: new GraphQLNonNull(require("../game/GameType")),
      resolve: goal => goal.getGame()
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString)
    },

    updatedAt: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});
