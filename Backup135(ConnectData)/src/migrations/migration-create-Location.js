"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Locations", {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Name: {
        type: Sequelize.STRING,
      },
      Position_ID: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE(6),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE(6),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Locations");
  },
};
