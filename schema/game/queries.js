const { GraphQLNonNull, GraphQLInt } = require("graphql");
const {
  connectionDefinitions,
  forwardConnectionArgs,
  connectionFromArraySlice,
  cursorToOffset
} = require("graphql-relay");

const GameType = require("./GameType");
const db = require("../../models");

const games = {
  type: connectionDefinitions({
    name: "Game",
    nodeType: GameType,
    connectionFields: {
      totalCount: { type: new GraphQLNonNull(GraphQLInt) }
    }
  }).connectionType,
  args: forwardConnectionArgs,
  async resolve(root, args, ctx) {
    const limit = args.first || 10;
    const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

    const { rows, count } = await db.Game.findAndCountAll({
      limit,
      offset
    });

    return {
      ...connectionFromArraySlice(rows, args, {
        sliceStart: offset,
        arrayLength: count
      }),
      totalCount: count
    };
  }
};

module.exports = {
  games
};
