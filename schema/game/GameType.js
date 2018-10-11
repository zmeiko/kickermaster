const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} = require("graphql");
const { globalIdField } = require("graphql-relay");

const { nodeInterface } = require("../node");

const GameType = new GraphQLObjectType({
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
    //
    // Goals: {
    //   type: new GraphQLList(GoalType),
    //   resolve(parent, args, ctx) {
    //     return ctx.commentsByParentId.load(parent.id);
    //   }
    // },

    createdAt: {
      type: new GraphQLNonNull(GraphQLString)
    },

    updatedAt: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});

module.exports = GameType;
