const graphqlHTTP = require("koa-graphql");
const Router = require("koa-router");
const { applyMiddleware } = require("graphql-middleware");

const db = require("../../models");

const baseSchema = require("./schema");
const permissions = require("./permissions");
const schema = applyMiddleware(baseSchema, permissions);

const graphqlRouter = new Router();
graphqlRouter.all("/api/graphql", ctx =>
  graphqlHTTP({
    context: {
      db,
      isAuthenticated: ctx.isAuthenticated(),
      userId: ctx.user && ctx.user.id
    },
    graphiql: true,
    schema
  })(ctx)
);

module.exports = graphqlRouter;
