const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql");
const { globalIdField } = require("graphql-relay");
const { nodeInterface } = require("../node");

module.exports = new GraphQLObjectType({
  name: "User",
  interfaces: [nodeInterface],

  fields: () => ({
    id: globalIdField(),
    name: {
      type: GraphQLString
    },
    photoUrl: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    },
    Games: {
      type: new GraphQLNonNull(require("../game/GameType")),
      resolve: user => user.getGames()
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString)
    },

    updatedAt: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});
