const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} = require("graphql");
const { globalIdField } = require("graphql-relay");
const { nodeInterface } = require("../node");

const GoalType = require("../goal/GoalType");

module.exports = new GraphQLObjectType({
  name: "Game",
  interfaces: [nodeInterface],

  fields: () => ({
    id: globalIdField(),
    ball: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },

    Goals: {
      type: new GraphQLList(GoalType),
      resolve: game => game.getGoals()
    },

    createdAt: {
      type: new GraphQLNonNull(GraphQLString)
    },

    updatedAt: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});
