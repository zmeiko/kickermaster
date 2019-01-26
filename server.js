const { ApolloServer } = require("apollo-server-koa");
const moment = require("moment");
require("moment/locale/ru");
moment.locale("ru");

const PORT = process.env.PORT || 3000;

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const passport = require("koa-passport");
const cors = require("koa-cors");

const typeDefs = require("./app/graphql/schema");
const resolvers = require("./app/graphql/resolvers");

const db = require("./models");

const authRouter = require("./routers/authRouter");
const apiUsersRouter = require("./routers/apiUsersRouter");
const apiGamesRouter = require("./routers/apiGamesRouter");
const apiStatsRouter = require("./routers/apiStatsRouter");
const apiProfileRouter = require("./routers/apiProfileRouter");
const apiTournamentsRouter = require("./routers/apiTournamentsRouter");
const apiHealthCheckRouter = require("./routers/apiHealthCheckRouter");
const apiTeamsRouter = require("./routers/apiTeamsRouter");

const server = new Koa();

server.keys = [process.env.SECRET_KEY];
server.use(cors({ credentials: true }));
server.use(session({}, server));
server.use(passport.initialize());
server.use(passport.session());
server.use(bodyParser());

server.use(authRouter.routes());
server.use(apiUsersRouter.routes());
server.use(apiGamesRouter.routes());
server.use(apiStatsRouter.routes());
server.use(apiProfileRouter.routes());
server.use(apiTournamentsRouter.routes());
server.use(apiTeamsRouter.routes());
server.use(apiHealthCheckRouter.routes());

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    database: db
  })
});
apollo.applyMiddleware({ app: server });

db.sequelize
  .authenticate()
  .then(() => {
    server.listen(PORT);
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
