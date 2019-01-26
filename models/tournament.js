"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define(
    "Tournament",
    {
      title: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {}
  );
  Tournament.associate = function({ User, Team, TournamentTeam }) {
    Tournament.belongsTo(User);
    Tournament.belongsToMany(Team, {
      through: TournamentTeam
    });
  };
  return Tournament;
};
