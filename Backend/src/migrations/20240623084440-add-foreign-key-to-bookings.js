'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Bookings', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'Bookings_userId_fkey', // Tên ràng buộc khóa ngoại
      references: { // Tham chiếu đến bảng Users
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade', // Tùy chọn xóa dữ liệu liên quan khi xóa người dùng
      onUpdate: 'cascade' // Tùy chọn cập nhật dữ liệu liên quan khi cập nhật người dùng
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Bookings', 'Bookings_userId_fkey');
  }
};
