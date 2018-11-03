const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const gameQueries = require("./queries/gameQueries");
const userQueries = require("./queries/userQueries");

const gameMutations = require("./mutations/gameMutations");

const { nodeField } = require("./types");

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => Object.assign({ node: nodeField }, gameQueries, userQueries)
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => Object.assign(gameMutations)
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
