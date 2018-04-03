const router = require('koa-router')();
const passport = require('koa-passport');
const gameActions = require('./game/gameActions');
const userActions = require('./user/userActions');
require('./auth');

const FRONTEND_AUTH_CALLBACK = 'http://localhost:3001/';

class App {
  constructor({ clients }) {
    this.router = router
      .get('/auth/google', passport.authenticate('google'))
      .get('/auth/google/callback', function (ctx) {
        return passport.authenticate('google', function (err, user) {
          if (user === false) {
            ctx.throw(401)
          } else {
            ctx.login(user)
            ctx.redirect(FRONTEND_AUTH_CALLBACK)
          }
        })(ctx)
      })
      .post('/auth/token', passport.authenticate('local'))
      .post('/logout', function (ctx) {
        ctx.logout()
        ctx.redirect('/')
      })
      .get('/api/user', async function (ctx) {
        const user = ctx.state.user || null
        ctx.body = { user };
      })
      .get('/api/users', async function (ctx) {
        const users = await gameActions.getUsers();
        ctx.body = { users };
      })
      .get('/api/games', async function getGames(ctx) {
        const games = await gameActions.getGames();
        ctx.body = { games };
      })
      .get('/api/game/:gameId', async function getGames(ctx) {
        const { gameId } = ctx.params;
        const game = await gameActions.getGame(gameId);
        ctx.body = { game };
      })
      .post('/api/game', async function addGame(ctx) {
        ctx.body = await gameActions.addGame(ctx.request.body);
        const games = await gameActions.getGames();
        clients.forEach(connection => {
          connection.sendUTF(JSON.stringify(games))
        })
      })
      .delete('/api/game', async function removeGame(ctx) {
        await gameActions.removeGame({ userId, gameId });
        ctx.body = { success: true };
      })
      .post('/api/game/join', async function joinGame(ctx) {
        // const { id: userId } = ctx.state.user;
        // const { gameId, team } = ctx.request.body;
        const { gameId, userId, team } = ctx.request.body;
        await gameActions.joinGame({ userId, gameId, team });
        ctx.body = { success: true };
      })
      .post('/api/game/left', async function leftGame(ctx) {
        // const { id: userId } = ctx.state.user;
        // const { gameId } = ctx.request.body;
        const { gameId, userId } = ctx.request.body;
        await gameActions.leftGame({ userId, gameId });
        ctx.body = { success: true };
      })
      .post('/api/game/start', async function startGame(ctx) {
        const { gameId } = ctx.request.body;
        await gameActions.startGame({ gameId });
        ctx.body = { success: true };
      })
      .post('/api/game/finish', async function finishGame(ctx) {
        const { gameId } = ctx.request.body;
        await gameActions.finishGame({ gameId });
        ctx.body = { success: true };
      })
      .post('/api/game/goal', async function addGoal(ctx) {
        // const { id: userId } = ctx.state.user;
        // const { gameId, ownGoal } = ctx.request.body;
        const { gameId, ownGoal, userId } = ctx.request.body;
        const goal = await gameActions.addGoal({ userId, gameId, ownGoal });
        ctx.body = { goal };
      })
      .delete('/api/game/lastGoal', async function removeGoal(ctx) {
        const { id: userId } = ctx.state.user;
        const { gameId } = ctx.request.body;
        gameActions.removeLastGoal({ userId, gameId });
        ctx.body = { success: true };
      });
  }
}

module.exports = App;