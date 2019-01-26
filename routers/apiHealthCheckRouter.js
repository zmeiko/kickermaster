const Router = require("koa-router");

const apiHealthCheckRouter = new Router();

apiHealthCheckRouter.get("/api/ping", function(ctx) {
  ctx.status = 200;
});

module.exports = apiHealthCheckRouter;
