'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('Bookings', 'BookTours');

    // Xóa trường
    await queryInterface.removeColumn('BookTours', 'CruiseID');
    await queryInterface.removeColumn('BookTours', 'HotelID');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('BookTours', 'Bookings');

    // Hoàn tác xóa trường
    await queryInterface.addColumn('Bookings', 'CruiseID', {
      type: Sequelize.INTEGER, // Sửa lại kiểu dữ liệu cho phù hợp
      //allowNull: true, // Hoặc false tùy vào yêu cầu
    });
    await queryInterface.addColumn('Bookings', 'HotelID', {
      type: Sequelize.INTEGER, // Sửa lại kiểu dữ liệu cho phù hợp
      //allowNull: true, // Hoặc false tùy vào yêu cầu
    });
  }

};
