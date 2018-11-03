const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLString
} = require("graphql");

const { fromGlobalId, mutationWithClientMutationId } = require("graphql-relay");

const { GameType } = require("../types");
const { addGame } = require("../../../app/gamesModule");

const PlayerInput = new GraphQLInputObjectType({
  name: "PlayerInput",
  fields: () => ({
    team: { type: GraphQLInt },
    UserId: { type: GraphQLID }
  })
});
const GoalInput = new GraphQLInputObjectType({
  name: "GoalInput",
  fields: () => ({
    ownGoal: { type: GraphQLBoolean },
    UserId: { type: GraphQLID }
  })
});

const GraphQLAddGameMutation = mutationWithClientMutationId({
  name: "AddGame",
  inputFields: {
    ball: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    players: {
      type: new GraphQLList(PlayerInput)
    },
    goals: {
      type: new GraphQLList(GoalInput)
    }
  },
  outputFields: {
    game: {
      type: GameType,
      resolve: game => game
    }
  },
  mutateAndGetPayload: payload => {
    const gamePlayers = payload.players.map(player =>
      Object.assign(player, { UserId: fromGlobalId(player.UserId).id })
    );
    const goals = payload.goals.map(goal =>
      Object.assign(goal, { UserId: fromGlobalId(goal.UserId).id })
    );
    const gamePayload = Object.assign(
      { GamePlayers: gamePlayers, Goals: goals },
      payload
    );
    return addGame(gamePayload);
  }
});

module.exports = {
  GraphQLAddGameMutation
};
