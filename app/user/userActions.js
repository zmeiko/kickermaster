const db = require("../../models");

async function login(params) {
  const { email } = params;
  let user = await db.User.findOne({ where: { email } });
  if (user === null) {
    user = await db.User.create(params);
  }
  return user;
}

module.exports = {
  login
};
