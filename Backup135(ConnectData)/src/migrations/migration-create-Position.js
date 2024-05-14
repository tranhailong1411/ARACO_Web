"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Positions", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      Name: {
        type: Sequelize.STRING,
      },
      Koutei_ID: {
        type: Sequelize.STRING,
      },
      Delay_Time: {
        type: Sequelize.STRING,
      },
      Delay_Count: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Positions");
  },
};
