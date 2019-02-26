"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define(
    "Tournament",
    {
      title: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {}
  );
  Tournament.associate = function({
    User,
    Team,
    TournamentTeam,
    TournamentGame
  }) {
    Tournament.belongsTo(User);
    Tournament.belongsToMany(Team, {
      through: TournamentTeam
    });
    Tournament.hasMany(TournamentGame);
  };
  return Tournament;
};
