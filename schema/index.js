const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const gameQueries = require("./game/queries");
const gameMutations = require("./game/mutations");
const { nodeField, nodesField } = require("./node");

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      node: nodeField,
      nodes: nodesField,
      ...gameQueries
    }
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      ...gameMutations
    }
  })
});
