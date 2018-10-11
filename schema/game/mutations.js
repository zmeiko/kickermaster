const { GraphQLNonNull, GraphQLID, GraphQLString } = require("graphql");
const { fromGlobalId, mutationWithClientMutationId } = require("graphql-relay");

const db = require("../../models");
const GameType = require("./GameType");

const inputFields = {
  ball: {
    type: GraphQLString
  },
  status: {
    type: GraphQLString
  }
};

const outputFields = {
  game: {
    type: GameType
  }
};

const createGame = mutationWithClientMutationId({
  name: "CreateGame",
  inputFields,
  outputFields,
  async mutateAndGetPayload(input, context) {
    return db.Game.create(input);
  }
});

module.exports = {
  createGame
};
