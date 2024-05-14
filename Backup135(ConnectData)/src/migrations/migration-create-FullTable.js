"use strict";

const Koutei = require("../models/Koutei");
const Position = require("../models/Position");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("FullTables", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      Location: {
        type: Sequelize.STRING,
      },
      Date: {
        type: Sequelize.DATEONLY,
      },
      Shift: {
        type: Sequelize.STRING,
      },
      Position: {
        type: Sequelize.STRING,
      },
      Koutei: {
        type: Sequelize.STRING,
      },
      DelayTime: {
        type: Sequelize.STRING,
      },
      DelayCount: {
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
    await queryInterface.dropTable("FullTables");
  },
};
