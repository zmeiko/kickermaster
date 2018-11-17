const { GraphQLList, GraphQLID } = require("graphql");
const {
  connectionFromPromisedArray,
  connectionArgs
} = require("graphql-relay");
const { GamesConnection } = require("../types");

module.exports = {
  games: {
    type: GamesConnection,
    args: connectionArgs,
    resolve: (root, args, { db: { Game } }) =>
      connectionFromPromisedArray(Game.findAll(), args)
  }
};
