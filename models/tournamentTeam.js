"use strict";
module.exports = (sequelize, DataTypes) => {
  var TournamentTeam = sequelize.define("TournamentTeam", {}, {});
  TournamentTeam.associate = function({ Team, Tournament }) {
    TournamentTeam.belongsTo(Team);
    TournamentTeam.belongsTo(Tournament);
  };
  return TournamentTeam;
};
