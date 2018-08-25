const Router = require("koa-router");
const authModule = require("../app/authModule");
const tournamentsModule = require("../app/tournamentsModule");

const apiTournamentsRouter = new Router();

apiTournamentsRouter
  .post("/api/tournaments", async ctx => {
    const { user } = ctx.state;
    const { title } = ctx.request.body;

    const tournament = await tournamentsModule.createTournament({
      title,
      userId: user.id
    });
    ctx.body = { tournament };
  })
  .get("/api/tournaments", authModule.authenticatedOnly, async ctx => {
    const tournaments = await tournamentsModule.getTournaments();
    ctx.body = { tournaments };
  });

module.exports = apiTournamentsRouter;
