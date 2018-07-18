"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          updatedAt: new Date(),
          createdAt: new Date(),
          name: "Aleksey Kuznetsov",
          photoUrl: null,
          email: "test1@test.com"
        },
        {
          updatedAt: new Date(),
          createdAt: new Date(),
          name: "Anton Uskov",
          photoUrl: null,
          email: "test2@test.com"
        },
        {
          updatedAt: new Date(),
          createdAt: new Date(),
          name: "Anton Demin",
          photoUrl: null,
          email: "test3@test.com"
        },
        {
          updatedAt: new Date(),
          createdAt: new Date(),
          name: "Anton Barinov",
          photoUrl: null,
          email: "test4@test.com"
        },
        {
          updatedAt: new Date(),
          createdAt: new Date(),
          name: "Renat Berezovskiy",
          photoUrl: null,
          email: "test5@test.com"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
