"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define(
    "Tournament",
    {
      title: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id"
        }
      }
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
