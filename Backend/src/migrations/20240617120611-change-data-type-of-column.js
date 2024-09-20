'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Supports', 'Tel', {
      type: Sequelize.TEXT,
      allowNull: false // hoặc giá trị khác nếu cần thiết
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Supports', 'Tel', {
      type: Sequelize.INTEGER,
      allowNull: false // hoặc giá trị khác nếu cần thiết
    });

  }
};
