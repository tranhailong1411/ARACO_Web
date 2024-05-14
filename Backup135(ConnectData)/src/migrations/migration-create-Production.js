'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Productions', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
          },
      Location_ID: {
        type: Sequelize.STRING
      },
      Date: {   
        type: Sequelize.DATE
      },
      Shift: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Productions');
  }
};