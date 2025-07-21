'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        lastName: 'Emma',
        phone: '3310162752',
        email: 'admin@admin.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Test User',
        lastName: 'Test',
        phone: '3310162752',
        email: 'test@test.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
