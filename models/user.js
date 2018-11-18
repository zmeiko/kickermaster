"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      email: DataTypes.STRING,
      token: DataTypes.STRING
    },
    {}
  );
  User.associate = function({ Game, GamePlayer, Goal }) {
    User.belongsToMany(Game, { through: GamePlayer });
    User.hasMany(Goal);
  };
  User.prototype.getStatistic = async function({ from, to }) {
    const statistics = require("../app/statsModule");
    const userStats = await statistics.getUsersStats({
      date: from,
      userId: this.getDataValue("id")
    });
    return userStats.all[0];
  };
  return User;
};
