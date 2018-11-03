const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const gameQueries = require("./queries/gameQueries");
const userQueries = require("./queries/userQueries");
const { nodeField } = require("./types");

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => Object.assign({ node: nodeField }, gameQueries, userQueries)
});

module.exports = new GraphQLSchema({
  query: QueryType
});
