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
  .get("/api/tournaments", async ctx => {
    const tournaments = await tournamentsModule.getTournaments();
    ctx.body = { tournaments };
  })
  .get("/api/tournaments/:tournamentId", async ctx => {
    const { tournamentId } = ctx.params;
    const tournament = await tournamentsModule.getTournament(tournamentId);
    ctx.body = { tournament };
  })
  .get("/api/tournaments/:tournamentId/games-results", async ctx => {
    const { tournamentId } = ctx.params;
    const gamesResults = await tournamentsModule.getGamesResults(tournamentId);
    ctx.body = { gamesResults };
  })
  .get("/api/tournaments/:tournamentId/stats", async ctx => {
    const { tournamentId } = ctx.params;
    const stats = await tournamentsModule.getStats(tournamentId);
    ctx.body = { stats };
  })
  .post("/api/tournaments/:tournamentId/teams", async ctx => {
    const { tournamentId } = ctx.params;
    const { teamId } = ctx.request.body;

    const tournament = await tournamentsModule.linkTeam({
      tournamentId,
      teamId
    });
    ctx.body = { success: true };
  })
  .post("/api/tournaments/:tournamentId/schedule", async ctx => {
    const { tournamentId } = ctx.params;

    const tournament = await tournamentsModule.createTournamentGames(
      tournamentId
    );
    ctx.body = { success: true };
  })
  .post("/api/tournaments/games", async ctx => {
    const { tournamentGameId, gameId } = ctx.request.body;
    const tournament = await tournamentsModule.linkGame({
      tournamentGameId,
      gameId
    });
    ctx.body = { success: true };
  })
  .delete("/api/tournaments/:tournamentId/teams", async ctx => {
    const { tournamentId } = ctx.params;
    const { teamId } = ctx.request.body;

    const tournament = await tournamentsModule.unlinkTeam({
      tournamentId,
      teamId
    });
    ctx.body = { success: true };
  });

module.exports = apiTournamentsRouter;
