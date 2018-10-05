"use strict";
module.exports = (sequelize, DataTypes) => {
  const TeamsStats = sequelize.define(
    "TeamsStats",
    {
      wins0: DataTypes.STRING,
      wins1: DataTypes.STRING
    },
    {}
  );
  return TeamsStats;
};
