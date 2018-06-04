const db = require("../models");

async function getUsers() {
  const users = await db.User.findAll({
    include: [{ model: db.Goal }, { model: db.Game }]
  });
  return users.map(model => {
    const { Games, ...user } = model.toJSON();
    return {
      ...user,
      games: Games.map(game => game.id)
    };
  });
}

module.exports = {
  getUsers
};
