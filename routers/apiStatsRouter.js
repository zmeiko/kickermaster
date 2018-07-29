const Router = require("koa-router");
const statsModule = require("../app/statsModule");

const apiStatsRouter = new Router();

apiStatsRouter
  .get("/api/stats", async ctx => {
    const usersStats = await statsModule.getUsersStats();
    ctx.set("Access-Control-Allow-Credentials", "true");
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.body = { usersStats };
  })
  .post("/api/stats", async ctx => {
    const usersStats = await statsModule.getUsersStats(
      ctx.request.body.startOfWeek
    );
    ctx.set("Access-Control-Allow-Credentials", "true");
    ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
    ctx.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    ctx.body = { usersStats };
  });

module.exports = apiStatsRouter;
