const { GraphQLList, GraphQLID } = require("graphql");
const { UserType } = require("../types");

module.exports = {
  me: {
    type: UserType,
    resolve: (root, args, { db: { User }, userId }) => User.findById(userId)
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: (root, args, { db: { User } }) => User.findAll()
  }
};
