const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const cors = require('koa-cors');
const App = require('./app');
const serve = require('koa-static')
const wsServer = require('./wsServer');

const server = new Koa();
const app = new App({
  clients: wsServer.clients
})

server.keys = ['secret']
server.use(cors({ credentials: true }));
server.use(session({ domain: 'localhost' }, server))
server.use(passport.initialize())
server.use(passport.session())
server.use(bodyParser());
server.use(app.router.routes());
server.use(serve('frontend/build'));
server.listen(8080);
