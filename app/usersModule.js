const { User, Game, Goal, sequelize: { Op } } = require("../models");
const Sequelize = require("sequelize");

const merge = Sequelize.Utils.merge;

async function getUsers({ from, to, orderBy }) {
  let options = {};
  if (from) {
    options = merge(options, {
      include: {
        model: Game,
        where: {
          createdAt: {
            [Op.and]: {
              [Op.gte]: new Date(Number.parseInt(from))
            }
          }
        }
      }
    });
  }
  if (to) {
    if (from) {
      options = merge(options, {
        include: {
          model: Game,
          where: {
            createdAt: {
              [Op.and]: {
                [Op.lte]: new Date(Number.parseInt(to))
              }
            }
          }
        }
      });
    }
  }
  return User.findAll(options);
}

module.exports = {
  getUsers
};
