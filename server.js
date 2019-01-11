const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const moment = require("moment");
require("moment/locale/ru");
moment.locale("ru");

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const passport = require("koa-passport");
const cors = require("koa-cors");
const serve = require("koa-static");

const authRouter = require("./routers/authRouter");
const apiUsersRouter = require("./routers/apiUsersRouter");
const apiGamesRouter = require("./routers/apiGamesRouter");
const apiStatsRouter = require("./routers/apiStatsRouter");
const apiProfileRouter = require("./routers/apiProfileRouter");
const apiTournamentsRouter = require("./routers/apiTournamentsRouter");
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

server.use(serve(path.join(__dirname, "frontend/build")));

server.listen(process.env.PORT);
