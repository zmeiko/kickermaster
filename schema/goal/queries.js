const { GraphQLNonNull, GraphQLInt } = require("graphql");
const {
  connectionDefinitions,
  forwardConnectionArgs,
  connectionFromArraySlice,
  cursorToOffset
} = require("graphql-relay");

const GoalType = require("./GoalType");
const db = require("../../models");

const goals = {
  type: connectionDefinitions({
    name: "Goal",
    nodeType: GoalType,
    connectionFields: {
      totalCount: { type: new GraphQLNonNull(GraphQLInt) }
    }
  }).connectionType,
  args: forwardConnectionArgs,
  async resolve(root, args, ctx) {
    const limit = args.first || 10;
    const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

    const { rows, count } = await db.Goal.findAndCountAll({
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
  goals
};
