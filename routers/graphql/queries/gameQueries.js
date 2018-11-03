const { GraphQLList, GraphQLID } = require("graphql");
const { GameType } = require("../types");

module.exports = {
  allGames: {
    type: new GraphQLList(GameType),
    resolve: (root, args, { db: { Game } }) => Game.findAll()
  }
};
