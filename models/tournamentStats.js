"use strict";
module.exports = (sequelize, DataTypes) => {
  const TournamentStats = sequelize.define(
    "TournamentStats",
    {
      teamId: DataTypes.INTEGER,
      teamName: DataTypes.STRING,
      games: DataTypes.INTEGER,
      wins: DataTypes.INTEGER,
      defeats: DataTypes.INTEGER,
      goalsScored: DataTypes.INTEGER,
      goalsMissed: DataTypes.INTEGER
    },
    {}
  );
  return TournamentStats;
};
