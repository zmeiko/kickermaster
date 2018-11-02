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
  Tournament.associate = function({ User }) {
    Tournament.belongsTo(User);
  };
  return Tournament;
};
