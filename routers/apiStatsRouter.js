const Router = require("koa-router");
const statsModule = require("../app/statsModule");

const apiStatsRouter = new Router();

apiStatsRouter.get("/api/stats", async ctx => {
  const { date, userId } = ctx.request.query;
  const usersStats = await statsModule.getUsersStats({
    weekDate: date,
    userId
  });
  ctx.body = { usersStats };
});

apiStatsRouter.get("/api/stats/teams", async ctx => {
  const teamsStats = await statsModule.getTeamsStats();
  ctx.body = { teamsStats };
});

module.exports = apiStatsRouter;
