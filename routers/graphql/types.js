const {
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType
} = require("graphql");

const {
  connectionDefinitions,
  connectionFromPromisedArray,
  fromGlobalId,
  connectionArgs,
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

const CommandColor = new GraphQLEnumType({
  name: "CommandColor",
  values: {
    RED: { value: 0 },
    BLUE: { value: 1 }
  }
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
      args: {
        colorCommand: {
          type: CommandColor,
          defaultValue: null
        }
      },
      resolve: (game, args) => {
        const { colorCommand } = args;
        if (colorCommand != null) {
          return game.getGamePlayers({
            where: {
              team: colorCommand
            }
          });
        } else {
          return game.getGamePlayers();
        }
      }
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

const {
  connectionType: GamesConnection,
  edgeType: GameEdge
} = connectionDefinitions({
  name: "GameTypeConnection",
  nodeType: GameType
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

const ViewerType = new GraphQLObjectType({
  name: "Viewer",
  fields: () => ({
    user: {
      type: UserType,
      resolve: (root, args, { db: { User }, userId }) =>
        userId && User.findById(userId)
    },
    games: {
      type: GamesConnection,
      args: connectionArgs,
      resolve: (root, args, { db: { Game } }) =>
        connectionFromPromisedArray(Game.findAll(), args)
    }
  })
});

module.exports = {
  ViewerType,
  nodeInterface,
  nodeField,
  GamesConnection,
  GameEdge,
  GamePlayerType,
  GameType,
  GoalType,
  UserType
};
