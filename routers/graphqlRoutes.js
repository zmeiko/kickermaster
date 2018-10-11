const graphqlHTTP = require("koa-graphql");
const Router = require("koa-router");

const schema = require("../schema");

const graphQLRouter = new Router();
graphQLRouter.all(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

module.exports = graphQLRouter;
