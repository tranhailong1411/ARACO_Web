"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        ID: "1",
        Name: "John",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
