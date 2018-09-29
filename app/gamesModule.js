const moment = require("moment");
const db = require("../models");

async function addGame(payload) {
  const game = await db.Game.create(payload, {
    include: [db.Game.GamePlayers, db.Game.Goals]
  });
  return game;
}

async function getGames(date) {
  const startOfWeek = moment(date)
    .startOf("week")
    .toDate();
  const endOfWeek = moment(date)
    .endOf("week")
    .toDate();
  const { Op } = db.Sequelize;

  const games = await db.Game.findAll({
    include: [{ model: db.User }, { model: db.Goal }],
    where: {
      createdAt: {
        [Op.and]: {
          [Op.gt]: startOfWeek,
          [Op.lt]: endOfWeek
        }
      }
    },
    order: [["createdAt", "DESC"]]
  });
  return games;
}

async function getGame(gameId) {
  const game = await db.Game.findById(gameId, {
    include: [{ model: db.User }, { model: db.Goal }]
  });
  return game;
}

async function removeGame({ gameId }) {
  await db.Game.destroy({ where: { id: gameId } });
}

async function joinGame({ userId, gameId, team, position }) {
  const user = await db.User.findById(userId);
  const game = await db.Game.findById(gameId);
  if (game && user) {
    await game.addUser(user, { through: { team, position } });
  }
}

async function leftGame({ userId, gameId }) {
  const user = await db.User.findById(userId);
  const game = await db.Game.findById(gameId);
  if (game && user) {
    await game.removeUser(user);
  }
}

async function startGame({ gameId }) {
  const game = await db.Game.findById(gameId);
  if (game) {
    await game.update({ status: "STARTED" });
  }
  return game;
}

async function addGoal({ gameId, userId, ownGoal = false }) {
  const user = await db.User.findById(userId);
  const game = await db.Game.findById(gameId);
  const goal = db.Goal.build({ ownGoal });
  goal.setUser(user, { save: false });
  goal.setGame(game, { save: false });
  await goal.save();
  return goal;
}

async function removeGoal({ goalId }) {
  await db.Goal.destroy({ where: { id: goalId } });
}

async function removeLastGoal({ gameId, userId }) {
  const goal = await db.Goal.findOne({
    where: {
      gameId,
      userId
    },
    order: [["createdAt", "DESC"]]
  });
  await goal.destroy();
}

async function finishGame({ gameId }) {
  const game = await db.Game.findById(gameId);
  if (game) {
    await game.update({ status: "FINISHED" });
  }
  return game;
}

module.exports = {
  getGames,
  getGame,
  addGame,
  removeGame,
  joinGame,
  leftGame,
  startGame,
  addGoal,
  removeGoal,
  removeLastGoal,
  finishGame
};
