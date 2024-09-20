'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cruises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CruiseName: {
        type: Sequelize.STRING
      },
      CruiseImg: {
        type: Sequelize.BLOB("long")
      },
      Duration: {
        type: Sequelize.STRING
      },
      Price: {
        type: Sequelize.DECIMAL
      },
      Description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cruises');
  }
};
