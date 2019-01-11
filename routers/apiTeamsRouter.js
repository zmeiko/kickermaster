const Router = require("koa-router");
const authModule = require("../app/authModule");
const teamsModule = require("../app/teamsModule");

const apiTournamentsRouter = new Router();

apiTournamentsRouter
  .post("/api/teams", async ctx => {
    const { name, player1Id, player2Id } = ctx.request.body;

    const team = await teamsModule.createTeam({
      name,
      player1Id,
      player2Id
    });
    ctx.body = { team };
  })
  .get("/api/teams", async ctx => {
    const teams = await teamsModule.getTeams();
    ctx.body = { teams };
  });

module.exports = apiTournamentsRouter;
