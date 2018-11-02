const {
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require("graphql");
const {
  fromGlobalId,
  globalIdField,
  nodeDefinitions
} = require("graphql-relay");
const { nodeField, nodeInterface } = nodeDefinitions(
  // A method that maps from a global id to an object
  (globalId, { db: { Game, Goal, User, GamePlayer } }) => {
    const { id, type } = fromGlobalId(globalId);
    if (type === "Game") {
      return Game.findById(id);
    } else if (type === "Goal") {
      return Goal.findById(id);
    } else if (type === "User") {
      return User.findById(id);
    } else if (type === "GamePlayer") {
      return GamePlayer.findById(id);
    }
  },
  // A method that maps from an object to a type
  (obj, { db: { Game, Goal, User, GamePlayer } }) => {
    if (obj instanceof Game) {
      return GameType;
    } else if (obj instanceof Goal) {
      return GoalType;
    } else if (obj instanceof User) {
      return UserType;
    } else if (obj instanceof GamePlayer) {
      return GamePlayerType;
    }
  }
);

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: globalIdField("User"),
    name: {
      type: GraphQLString
    },
    photoUrl: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    games: {
      type: new GraphQLList(GameType),
      resolve: user => user.getGames()
    },
    goals: {
      type: new GraphQLList(GoalType),
      resolve: user => user.getGoals()
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }),
  interfaces: [nodeInterface]
});

const GameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    id: globalIdField("Game"),
    ball: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: game => game.getUsers()
    },
    goals: {
      type: new GraphQLList(GoalType),
      resolve: game => game.getGoals()
    },
    players: {
      type: new GraphQLList(GamePlayerType),
      resolve: game => game.getGamePlayers()
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }),
  interfaces: [nodeInterface]
});

const GoalType = new GraphQLObjectType({
  name: "Goal",
  fields: () => ({
    id: globalIdField("Game"),
    ownGoal: {
      type: GraphQLBoolean
    },
    game: {
      type: GameType,
      resolve: goal => goal.getGame()
    },
    user: {
      type: UserType,
      resolve: goal => goal.getUser()
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }),
  interfaces: [nodeInterface]
});

const GamePlayerType = new GraphQLObjectType({
  name: "GamePlayer",
  fields: () => ({
    id: globalIdField("Game"),
    team: {
      type: GraphQLInt
    },
    position: {
      type: GraphQLInt
    },
    game: {
      type: GameType,
      resolve: player => player.getGame()
    },
    user: {
      type: UserType,
      resolve: player => player.getUser()
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }),
  interfaces: [nodeInterface]
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    allGames: {
      type: new GraphQLList(GameType),
      resolve: (root, args, { db }) => db.Game.findAll()
    },
    node: nodeField
  })
});

module.exports = new GraphQLSchema({
  query: QueryType
});
