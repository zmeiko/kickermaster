const { gql } = require("apollo-server-koa");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    photoUrl: String
    email: String
    goals: [Goal]
    games: [Game]
  }

  type Goal {
    id: ID
    ownGoal: Boolean
    user: User
    game: Game
  }

  type Game {
    id: ID
    ball: String
    status: String
    goals: [Goal]
    gamePlayers: [User]
  }

  type Query {
    games: [Game]
    users: [User]
  }
`;

module.exports = typeDefs;
