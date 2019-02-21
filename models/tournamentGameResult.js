"use strict";
module.exports = (sequelize, DataTypes) => {
  const TournamentGameResult = sequelize.define(
    "TournamentGameResult",
    {
      gameId: DataTypes.INTEGER,
      team1Id: DataTypes.INTEGER,
      team2Id: DataTypes.INTEGER,
      teamIdRed: DataTypes.INTEGER,
      teamIdBlue: DataTypes.INTEGER,
      goalsRed: DataTypes.INTEGER,
      goalsBlue: DataTypes.INTEGER
    },
    {}
  );
  return TournamentGameResult;
};
