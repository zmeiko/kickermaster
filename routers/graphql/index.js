const graphqlHTTP = require("koa-graphql");
const Router = require("koa-router");

const db = require("../../models");
const schema = require("./schema");

const graphqlRouter = new Router();
graphqlRouter.all(
  "/api/graphql",
  graphqlHTTP({
    context: { db },
    graphiql: true,
    schema
  })
);

module.exports = graphqlRouter;
