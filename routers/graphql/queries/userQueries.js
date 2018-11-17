const { GraphQLList, GraphQLID } = require("graphql");
const { UserType, ViewerType } = require("../types");

module.exports = {
  viewer: {
    type: ViewerType,
    resolve: () => ({})
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: (root, args, { db: { User } }) => User.findAll()
  }
};
