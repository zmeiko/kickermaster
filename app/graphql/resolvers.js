const resolvers = {
  Query: {
    users(parent, args, { database: { User } }, info) {
      return User.findAll();
    },
    games(parent, args, { database: { Game } }, info) {
      return Game.findAll();
    }
  },
  User: {
    games(parent, args, { database: { User } }, info) {
      return parent.getGames();
    }
  },
  Game: {
    goals(parent, args, { database: { User } }, info) {
      return parent.getGoals();
    }
  },
  Goal: {
    user(parent) {
      return parent.getUser();
    },
    game(parent) {
      return parent.getGame();
    }
  }
};

module.exports = resolvers;
