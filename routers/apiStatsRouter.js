const Router = require("koa-router");
const statsModule = require("../app/statsModule");

const apiStatsRouter = new Router();

apiStatsRouter.get("/api/stats/:currentDate", async ctx => {
  const usersStats = await statsModule.getUsersStats(ctx.params.currentDate);
  ctx.body = { usersStats };
});

module.exports = apiStatsRouter;
