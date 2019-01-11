"use strict";
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Team.associate = function({ User }) {
    Team.belongsTo(User, { as: "player1" });
    Team.belongsTo(User, { as: "player2" });
  };
  return Team;
};
