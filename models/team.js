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
    Team.belongsTo(User, { as: "player1Id" });
    Team.belongsTo(User, { as: "player2Id" });
  };
  return Team;
};
