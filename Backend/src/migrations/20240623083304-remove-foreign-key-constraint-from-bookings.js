'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Bookings', 'bookings_ibfk_1');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Bookings', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'bookings_ibfk_1', // tên ràng buộc khóa ngoại
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  }

};
