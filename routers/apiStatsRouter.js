const Router = require("koa-router");
const statsModule = require("../app/statsModule");

const apiStatsRouter = new Router();

apiStatsRouter.get("/api/stats", async ctx => {
  const usersStats = await statsModule.getUsersStats(
    ctx.request.query.currentDate
  );
  ctx.body = { usersStats };
});

module.exports = apiStatsRouter;
