"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Open",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "In Progress",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Resolved",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Closed",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
