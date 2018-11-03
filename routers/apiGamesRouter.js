const Router = require("koa-router");
const gamesModule = require("../app/gamesModule");

const apiGamesRouter = new Router();

apiGamesRouter
  .get("/api/games", async ctx => {
    const games = await gamesModule.getGames(ctx.request.query.date);
    ctx.body = { games };
  })
  .get("/api/game/:gameId", async function getGames(ctx) {
    const { gameId } = ctx.params;
    const game = await gamesModule.getGame(gameId);
    ctx.body = { game };
  })
  .post("/api/game", async ctx => {
    ctx.body = await gamesModule.addGame(ctx.request.body);
  })
  .delete("/api/game", async ctx => {
    await gamesModule.removeGame({ userId, gameId });
    ctx.body = { success: true };
  });

module.exports = apiGamesRouter;
