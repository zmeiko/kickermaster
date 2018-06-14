const db = require("../models");

async function getUsers() {
  const users = await db.User.findAll();
  return users;
}

module.exports = {
  getUsers
};
