"use strict";

const Koutei = require("../models/Koutei");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Kouteis", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      Koutei_ID: {
        primaryKey: true,
        autoIncrement: false,
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
    await queryInterface.dropTable("Kouteis");
  },
};
